import React, {useState, useRef, useEffect, useContext} from "react";
import {GameContext} from '../../context/GameContext';
import { types } from "../../context/actions";
import { DEFAULT_POSITION, Chess} from 'chess.js';
import { createBoard,getGameOverState }  from "../../functions";
import Board from '../../components/board';
import GameOver from "../../components/gameover";
import io from 'socket.io-client';


import {Howl} from "howler";
let boing_sfx,ohno_sfx,oops_sfx,phew_sfx;
let sfxs;
var openingMove = true;

// initializes howl sfx for board interactivity
function initialize_sfx() {
        boing_sfx = new Howl({
            src: ['../../assets/sfx/boing.wav'],
            format: ['mp3'],
            html5: true,
        });
        ohno_sfx = new Howl({
            src: ['../../assets/sfx/ohno.wav'],
            format: ['mp3'],
            html5: true,
        });
        oops_sfx = new Howl({
            src: ['../../assets/sfx/oops.wav'],
            format: ['mp3'],
            html5: true,
        });
        phew_sfx = new Howl({
            src: ['../../assets/sfx/phew.wav'],
            format: ['mp3'],
            html5: true,
        });
        sfxs = [boing_sfx, ohno_sfx, oops_sfx, phew_sfx];
    
    
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
    
    // defines stateful fen and a setter method for fen
    const [fen, setFen] = useState(DEFAULT_POSITION);
    const { current: chess } = useRef(new Chess(fen));
    const [board, setBoard] = useState(createBoard(fen));
    const { dispatch, gameOver } = useContext(GameContext)

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
        socket.emit('join', {name: 'swordfish', gameID:'20'},({error, color}) => {
            console.log({color});
        });

        socket.on('Welcome', ({message, opponent }) => {
            console.log({message,opponent});
        });

        socket.on('opponentJoin', ({message, opponent}) => {
            console.log({message,opponent});
        });

        socket.on('opponentMove',({from,to}) => {
            chess.move({from, to});
            setFen(chess.fen());
            console.log(`Move made from ${from} to ${to}.`)

        });

        socket.on('message', ({message}) => {
            console.log({message});
        });
    },[chess]);

    
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

    const fromSquare = useRef();


    /**
     *  Function for making a move with a piece, validated by `chess.js`
     * @param {*} square 
     */
    const makeMove = (square) => {

        if (openingMove){
            initialize_sfx()
            console.log('yeet')
            openingMove = false;
        }


        

        const from = fromSquare.current;
        const to = square;
        
        // attempt to move
        try {
            chess.move({from, to});
            dispatch({type:types.CLEAR_POSSIBLE_MOVES});
            setFen(chess.fen());
            socket.emit('move', {gameID:'20', from, to})
        } catch (error){
            //if the move is not valid
            console.log("oops!")
            sfxs[0].play()
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
    <div className="game">
        <Board 
            nodes={board} 
            makeMove={makeMove} 
            setFromSquare={setFromSquare} 
        />
    </div>
    );
};



export default Game;


