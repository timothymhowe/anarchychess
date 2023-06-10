import React from "react";
import './board-styles.css';
import Node from '../node'
import PropTypes from 'prop-types';
import {Frame} from 'react95';



const Board = ({ nodes, ...props }) => {
    let bounds;
    return (
        <Frame variant='well' className='boardbox'>
        <Frame variant='well' style={{aspectRatio:'1 / 1',width:'inherit'}}>
        <div className="board" style={{aspectRatio:'1 / 1'}} id="the_board">
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