import React from "react";
import './board-styles.css';
import Node from '../node'
import PropTypes from 'prop-types';

const Board = ({ nodes }) => {
    return (
        <div className="board">
            {nodes.map((node,idx)=>(
                <Node node={node} idx={idx} key={node.square} />
                // <div key={node.square}>{node.square}</div>
            ))}
        </div>
    );
};

Board.prototype = {
    nodes: PropTypes.array.isRequired,
}

export default Board;