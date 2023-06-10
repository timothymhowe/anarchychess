import React, {useContext} from "react";
import PropTypes from 'prop-types';

import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'


import { isLightSquare, Node as BoardNode } from '../../functions'
import Piece from '../piece';
import {GameContext} from '../../context/GameContext';

// import stylesheet
import './node-styles.css';

/**
 * 
 * @param {*} param0 
 * @returns 
 */
const Node = ({node,idx, makeMove, setFromSquare, bounds}) => {
    const light = isLightSquare(node.square,idx);

    const { possibleMoves, turn, check, opponentMoves } = useContext(GameContext);
    
    // check color of the piece
    const color = node.piece.toUpperCase() === node.piece ? 'w' : 'b';

    // determines if the node is a valid move
    const isPossibleMove = possibleMoves.includes(node.square);
    const isOpponentMove = opponentMoves.includes(node.square);

    // checks to see if the player is in check.
    const inCheck = () => {
        const isKing = node.piece.toUpperCase() === 'K';
        return turn === color && isKing && check;
    };

    // implements a handler for the Drop event.
    const handleDrop = () =>{
        makeMove(node.square)
    };

    const handleDragOver = (e) =>{
        e.preventDefault() 
        this.style.border={}
        console.log("Dragged over " + node.square)
    }

    return (
    <div className={`node ${light ? 'light' : 'dark'}`} style={{position:'relative'}}
        
        onDrop = {handleDrop}
        onDragOver={(e) => handleDragOver(e)}>

        <div 
            className={`overlay ${isPossibleMove && 'possible-move'} ${
                inCheck() && 'check'
            } ${isOpponentMove && 'opponent-move'}`}     
        >
            <Piece square={node.square} name={node.piece} setFromSquare={setFromSquare} />
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