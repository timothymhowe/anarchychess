import React, {useContext} from "react";
import PropTypes from 'prop-types';

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
const Node = ({node,idx, makeMove, setFromSquare}) => {
    const light = isLightSquare(node.square,idx);

    const { possibleMoves, turn, check } = useContext(GameContext);
    
    // check color of the piece
    const color = node.piece.toUpperCase() === node.piece ? 'w' : 'b';

    // determines if the node is a valid move
    const isPossibleMove = possibleMoves.includes(node.square);

    const inCheck = () => {
        const isKing = node.piece.toUpperCase() === 'K';
        return turn === color && isKing && check;
    };

    // implements a handler for the Drop event.
    const handleDrop = () =>{
        makeMove(node.square)
    };

    return (
    <div className={`node ${light ? 'light' : 'dark'}`}
        
        onDrop = {handleDrop}
        onDragOver={ (e) => e.preventDefault() }>

        <div 
            className={`overlay ${isPossibleMove && 'possible-move'} ${
                inCheck() && 'check'
            }`}     
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