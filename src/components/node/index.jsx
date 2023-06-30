import React, { useContext, useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';

import { isLightSquare, Node as BoardNode } from '../../functions'
import Piece from '../piece';
import { GameContext } from '../../context/GameContext';

import PromotionWindow from "../promotion";

import './node-styles.css';

/**
 * 
 * @param {*} param0 
 * @returns 
 */
const Node = ({ node, idx, makeMove, setFromSquare, setPromote }) => {

    const tempRef = useRef(); // for handling the Strict Mode warning

    const light = isLightSquare(node.square, idx);

    const { possibleMoves, possibleCaptures, possiblePromotions, possibleCastles, turn, check, opponentMoves } = useContext(GameContext);

    const [hitMarker, setHitMarker] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

   

    // check color of the piece
    const color = node.piece.toUpperCase() === node.piece ? 'w' : 'b';

    // determines if the node is a valid move
    const isPossibleMove = possibleMoves.includes(node.square) || possibleCastles?.includes(node.square);
    const isPossiblePromotion = possiblePromotions?.includes(node.square);
    const isPossibleCapture = possibleCaptures?.includes(node.square);
    const isOpponentMove = opponentMoves?.includes(node.square);






    // checks to see if the player is in check.
    const inCheck = () => {
        const isKing = node.piece.toUpperCase() === 'K';
        return turn === color && isKing && check;
    };

    useEffect(() => {
        if (inCheck()){
            setHitMarker(true);
            
            setTimeout(() => {
                setFadeOut(true)
            })
        }

    },[check])

    // implements a handler for the RightClick event.
    const handleRightClick = (e) => {
        e.preventDefault();     
        if (isPossiblePromotion) {
            setPromote(node.square)    
        } else {
        makeMove(node.square);
        }
    };




    return (
        <div 
        className={`node ${light ? 'light' : 'dark'} `} 
        style={{ position: 'relative' }} 
        onContextMenu={(e) => handleRightClick(e)} 
        ref={tempRef}>
            <div className={`overlay 
                            ${isPossibleMove && 'possible-move' } 
                            ${isPossibleCapture && 'possible-capture' } 
                            ${isPossiblePromotion && 'possible-promotion' } 
                            ${inCheck() && 'check'} 
                            ${isOpponentMove && 'opponent-move'}
                            `}
            >

                <Piece square={node.square} name={node.piece} setFromSquare={setFromSquare}  />

                <img  src='assets/misc/marker.png' className={`${hitMarker?'hit-marker':'hit-marker-hidden'} ${fadeOut?'fade-out':''}`}   onTransitionEnd={
                    (event) => {
                        console.log('work pls')
                        setFadeOut(false)
                        setHitMarker(false)
                    }
                }/>
            </div>
        </div>
    );
};

Node.prototype = {
    node: PropTypes.instanceOf(BoardNode).isRequired,
    idx: PropTypes.number.isRequired,
    makeMove: PropTypes.func,
    setFromSquare: PropTypes.func,

};

export default Node;

const fadeMarker = () =>{

}