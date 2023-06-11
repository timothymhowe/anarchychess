import React, {useContext, useState, useRef} from "react";
import PropTypes from 'prop-types';

import Draggable from 'react-draggable'



import { isLightSquare, Node as BoardNode } from '../../functions'
import Piece from '../piece';
import {GameContext} from '../../context/GameContext';

import './node-styles.css';

/**
 * 
 * @param {*} param0 
 * @returns 
 */
const Node = ({node,idx, makeMove, setFromSquare, board}) => {

    const tempRef = useRef(); // for handling the Strict Mode warning

    const light = isLightSquare(node.square,idx);

    const { possibleMoves, turn, check, opponentMoves } = useContext(GameContext);
    
    // check color of the piece
    const color = node.piece.toUpperCase() === node.piece ? 'w' : 'b';

    // determines if the node is a valid move
    const isPossibleMove = possibleMoves.includes(node.square);
    const isOpponentMove = opponentMoves.includes(node.square);

    const [dropTarget, setDropTarget] = useState(false)

    // checks to see if the player is in check.
    const inCheck = () => {
        const isKing = node.piece.toUpperCase() === 'K';
        return turn === color && isKing && check;
    };

    // implements a handler for the Drop event.
    const handleDrop = () =>{
        console.log("Dropped on " + node.square)
        try{
            makeMove(node.square);
        } catch (error){
            
        }
    };

    const handleMouseLeave = (e) =>{
      e.preventDefault();
        
    };

    const handleDragOver = (e) =>{
        e.preventDefault();
    }

    return (
    // <Draggable onStart={()=>false} nodeRef={tempRef}>
    <div className={`node ${light ? 'light' : 'dark'} `} style={{position:'relative'}}
        
        onMouseUp = {handleDrop}
        onMouseOver={(e) => handleDragOver(e)}
        onMouseLeave={(e) => handleMouseLeave(e)}
        ref={tempRef}>

        <div 
            className={`overlay ${isPossibleMove && 'possible-move'} ${
                inCheck() && 'check'
            } ${isOpponentMove && 'opponent-move'}`}     
        >
            <Piece square={node.square} name={node.piece} setFromSquare={setFromSquare} boardRef={board} />
        </div>
    </div>
    // </Draggable>
    );
};

Node.prototype = {
    node: PropTypes.instanceOf(BoardNode).isRequired,
    idx: PropTypes.number.isRequired,
    makeMove: PropTypes.func,
    setFromSquare: PropTypes.func,
    
};

export default Node;