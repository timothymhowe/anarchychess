import React, {useState, useRef, useEffect, useContext} from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

// importing react95 components for styling the page
import { Button, Frame, Toolbar, Window, WindowContent, WindowHeader, styleReset, ScrollView } from 'react95';
/* Original Windows95 font (optional) */
// import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
// import ms_sans_serif from '../../assets/fonts/w95fa.woff2';
// import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

import Taskbar from '../../components/taskbar/taskbar'
import Shortcut from '../../components/shortcut'

import Draggable from 'react-draggable'

import {GameContext} from '../../context/GameContext';
import { setMessage, setOpponent, setOpponentMoves, setPlayer, setPlayerColor, types } from '../../context/game_actions';
import { DEFAULT_POSITION, Chess} from 'chess.js';
import { createBoard,getGameOverState }  from "../../functions";
import Board from '../../components/board';
import GameOver from "../../components/gameover";

import ChessWindow from "../../components/chesswindow"

// import Desktop from '../../components/desktop';
import Player from "../../components/player";
import io from 'socket.io-client';
import './game-styles.css';

import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'query-string';

/* Pick a theme of your choice */
import original from 'react95/dist/themes/original';

import {Howl} from "howler";
let boing_sfx,ohno_sfx,oops_sfx,phew_sfx,discord_sfx, marker_sfx;
let sfxs;
var openingMove = true;


const Icons = styled.div`
display: grid;
width:100px;
grid-template-columns: repeat(1,1fr);
gap: 10px;
grid-auto-rows:minmax(64px 72px);
content
`
 
 

const Desktop = styled.div`
background: ${({ theme }) => theme.desktopBackground};
height:calc(100vh - 47px);


#default-buttons button {
    margin-bottom: 1rem;
    margin-right: 1rem;
    user-select:none;
    
  }

  .boardbox {
    background: ${({ theme }) => theme.canvas};
    width: 100%;
    height: 100%;
    margin-left:0%;
    margin-right:0%;
    display:inline-block;
    text-align:center;
    
  }

  .window-content{
    height:100%;
    width:auto;
    aspect-ratio: 1 / 1;
    margin:.25rem .25rem .5rem .25rem;

  }
`;  


// const GlobalStyles = createGlobalStyle`
// ${styleReset}
// @font-face {
//     font-family: 'ms_sans_serif';
//     src: url('${ms_sans_serif}') format('woff2');
//     font-weight: normal;
//     font-style: normal;
//   }
//   @font-face {
//     font-family: 'ms_sans_serif';
//     src: url('${ms_sans_serif_bold}') format('woff2');
//     font-weight: bold;
//     font-style: normal
//   }
//   body, input, select, textarea, button {
//     font-family: 'ms_sans_serif';
//   }
//   background-color:#008080
// `

// initializes howl sfx for board interactivity
function initialize_sfx() {
        boing_sfx = new Howl({
            src: ['/assets/sfx/boing.mp3'],
            format: ['mp3'],
            html5: true,
        });
        ohno_sfx = new Howl({
            src: ['/assets/sfx/ohno.mp3'],
            format: ['mp3'],
            html5: true,
        });
        oops_sfx = new Howl({
            src: ['/assets/sfx/oops.mp3'],
            format: ['mp3'],
            html5: true,
        });
        phew_sfx = new Howl({
            src: ['/assets/sfx/phew.mp3'],
            format: ['mp3'],
            html5: true,
        });

        discord_sfx = new Howl({
            src: ['/assets/sfx/discord.mp3'],
            format: ['mp3'],
            html5: true,
        });
        marker_sfx = new Howl({
            src: ['/assets/sfx/marker.mp3'],
            format: ['mp3'],
            html5: true,
        });

        sfxs = [boing_sfx, ohno_sfx, oops_sfx, phew_sfx, discord_sfx, marker_sfx];


    
    
}


// creating a socket by calling io on the chess server
const socket = io('localhost:5001')



// const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
// const INITIAL_FEN = DEFAULT_POSITION;
// const INITIAL_FEN = 'rnb1kbnr/pppp1ppp/8/4p3/5PP1/8/PPPPP2P/RNBQKBNR w KQkq - 101 50'



/**
 * 
 * @returns 
 */
const Game = () => {

    
    const [realTime,setRealTime] = useState(false);
    
    useEffect(()=>{
        let delay;
        if(realTime){
            delay = window.setTimeout(function(){
                discord_sfx.play()
            }, 10000)
        }

    },[realTime])

    
    // defines stateful fen and a setter method for fen
    const [fen, setFen] = useState(DEFAULT_POSITION);
    const { current: chess } = useRef(new Chess(fen));
    const [board, setBoard] = useState(createBoard(fen));
    const { 
        dispatch, 
        gameOver,
        playerName: player,
        opponentName,
        playerColor,
        check,
    } = useContext(GameContext);

    const location = useLocation();
    const nav = useNavigate();
    const playerName = useRef();
    const GID = useRef();

    // initializes the SFX on first render
    useEffect(() => {
        initialize_sfx()
    },[])

    useEffect(() => {
        const {id , name} = qs.parse(location.search);
        playerName.current = name;
        GID.current = id;
    }, [location.search]);
    

    /**
     * 
     */
    useEffect(()=> {
        setBoard(createBoard(fen));
    }, [fen]);

    /**
     * 
     */
    useEffect(() => {
        socket.emit(
            'join', 
            {name: playerName.current, GID:GID.current},
            ({error, color}) => 
            {
                if (error){
                    nav('/');
                }
                dispatch(setPlayer(playerName.current));
                dispatch(setPlayerColor(color));
            }

        );

        socket.on('welcome', ({message, opponent }) => {
            dispatch(setMessage(message));
            dispatch(setOpponent(opponent));
        });

        socket.on('opponentJoin', ({message, opponent}) => {
            dispatch(setMessage(message));
            dispatch(setOpponent(opponent));
        });

        // sets up listener for when the network opponent makes a move
        socket.on('opponentMove',({from,to}) => {
            chess.move({ from, to });
            setFen(chess.fen());
            dispatch(setMessage('Your Turn'));
            dispatch(setOpponentMoves([from, to]));
            console.log(`Move made from ${from} to ${to}.`)

        });

        socket.on('message', ({message}) => {
            dispatch(setMessage(message));
        });
    },[chess, nav, dispatch]);

    
    /**
     * 
     */
    useEffect(() => {
        const [gameOver, status] = getGameOverState(chess);

        if (gameOver){
            dispatch({
                type: types.GAME_OVER,
                 status,
                  player: chess.turn() 
            });
            
            return;
        }


        dispatch({
            type: types.SET_TURN, 
            player: chess.turn(),
            check: chess.inCheck(),
        });
    }, [fen, dispatch, chess]);

    useEffect(()=>{
        if(check){
            marker_sfx.play();
        }
    },[check])

    const fromSquare = useRef();

    /**
     *  Function for making a move with a piece, validated by `chess.js`
     * @param {*} square 
     */
    const makeMove = (square, promotion) => {

        if (openingMove){
             setRealTime(true)
             openingMove = false;
         }

        const prom = promotion
        const from = fromSquare.current;
        const to = square;
        let move;
        if (promotion){
            move={from:from,to:to,promotion:prom}
        } else {
            move = {from:from,to:to}
        }
        
        // attempt to move
        
        try {
            chess.move(move);
            dispatch({type:types.CLEAR_POSSIBLE_MOVES});
            setFen(chess.fen());
            socket.emit('move', {GID:GID.current, from, to})

        } catch (error){
            //if the move is not valid
            console.log(error)
            dispatch({type:types.CLEAR_POSSIBLE_MOVES});
            if (from != to){
            const which_sound = Math.floor(Math.random() * 4)
            sfxs[which_sound].play();
            }
        }
     
        
    };

    const setFromSquare = (square) => {
        fromSquare.current = square;
        dispatch({
            type: types.SET_POSSIBLE_MOVES,
            moves: chess.moves ({square}),
        });
    }; 


    if (gameOver){
        return <GameOver />;
    }

    
    return (
    <div style={{height:'100vh'}}>

    <Desktop style={{overflow:"clip"}}>

        {/* TODO: Hard coded the size in each of these, but will make it dynamic once i make font size changeable. */}
        <Icons >
            <Shortcut iconName={'recycle'}  label={'Recycle Bin'} size='48' hasOverlay={false}/>
            <Shortcut iconName={'mycomputer'} label={'My Computer'} size='48' hasOverlay={false}/>
            <Shortcut iconName={'anarchy'}  label={'Anarchy Chess'} size='48' hasOverlay={true}/>
        </Icons>

        <ChessWindow board={board} makeMove={makeMove} setFromSquare={setFromSquare}>

        </ChessWindow>
        <div style={{width:"100%"}}></div>
    </Desktop>
    
    <header className='start-head'>
        <Taskbar ></Taskbar>
    </header>
    </div>
    );
};



export default Game;


