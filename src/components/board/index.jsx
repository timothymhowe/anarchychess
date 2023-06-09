import React from "react";
import './board-styles.css';
import Node from '../node'
import PropTypes from 'prop-types';
import {Frame} from 'react95';



const Board = ({ nodes, ...props }) => {
    return (
        <Frame variant='well' id='boardbox'>
        <Frame variant='well'>
        <div className="board">
            {nodes.map((node,idx)=>(
                <Node node={node} idx={idx} key={node.square} {...props} />
            ))}
        </div>
        </Frame>
        </Frame>
    );
};

Board.prototype = {
    nodes: PropTypes.array.isRequired,
    makeMove: PropTypes.func,
    setFromSquare: PropTypes.func,
};

export default Board;