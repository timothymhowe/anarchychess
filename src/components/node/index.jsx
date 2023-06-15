import React, { useContext, useState, useRef } from "react";
import PropTypes from 'prop-types';

import { isLightSquare, Node as BoardNode } from '../../functions'
import Piece from '../piece';
import { GameContext } from '../../context/GameContext';

import './node-styles.css';

/**
 * 
 * @param {*} param0 
 * @returns 
 */
const Node = ({ node, idx, makeMove, setFromSquare, board }) => {

    const tempRef = useRef(); // for handling the Strict Mode warning

    const light = isLightSquare(node.square, idx);

    const { possibleMoves, possibleCaptures, possiblePromotions, possibleCastles, turn, check, opponentMoves } = useContext(GameContext);


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

    // implements a handler for the RightClick event.
    const handleRightClick = (e) => {
        const the_promo = 'q'
        e.preventDefault();
        
     
        if (isPossiblePromotion) {
            
            makeMove(node.square, the_promo);
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
                            ${isOpponentMove && 'opponent-move'}`}
            >
                <Piece square={node.square} name={node.piece} setFromSquare={setFromSquare}  />
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