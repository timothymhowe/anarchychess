import React, {useRef, useEffect} from "react";
import './board-styles.css';
import Node from '../node'
import PropTypes from 'prop-types';
import {Frame} from 'react95';



const Board = ({ nodes, ...props }) => {
    const boardRef = useRef()
    return (
        <Frame variant='well' className='boardbox'>
        <Frame id='inner-boardbox' variant='well' style={{aspectRatio:'1 / 1',width:'inherit', }} >
        
            <div className="board" style={{aspectRatio:'1 / 1',position:'relative'}} id="the-board" ref={boardRef} >
                {nodes.map((node,idx)=>(
                    <Node node={node} idx={idx} key={node.square} {...props} board={boardRef} />
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