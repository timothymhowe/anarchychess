import React, {useState, useRef, useEffect, useContext} from "react";
import {GameContext} from '../../context/GameContext';
import { types } from "../../context/actions";
import {Chess} from 'chess.js';
import { createBoard }  from "../../functions";
import Board from '../../components/board';

const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';


const Game = () => {
    const [fen, setFen] = useState(INITIAL_FEN);
    const { current: chess } = useRef(new Chess(fen));
    const [board,setBoard] = useState(createBoard(fen));
    
    const { dispatch } = useContext(GameContext)

    useEffect(()=> {
        setBoard(createBoard(fen));
    }, [fen]);

    useEffect(() => {

        const [gameOver, status] = getGameOverState(chess);
        if (gameOver){
            dispatch({type: types.GAME_OVER, status, player: chess.turn()});
            return;
        }


        dispatch({
            type: types.SET_TURN, //import types from '../../context/actions'
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
        const from = fromSquare.current;
        const to = square;
        chess.move({from, to});
        dispatch({type:types.CLEAR_POSSIBLE_MOVES});
        setFen(chess.fen());
    };

    const setFromSquare = (square) => {
        fromSquare.current = square;
        dispatch({
            type: types.SET_POSSIBLE_MOVES,
            moves: chess.moves ({the_square: square}),
        });
    }; 


    return (
    <div className="game">
        <Board nodes={board} makeMove={makeMove} setFromSquare={setFromSquare} />
    </div>
    );
};



export default Game;