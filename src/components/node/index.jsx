import React from "react";
import PropTypes from 'prop-types';
import './node-styles.css';
import { isLightSquare, Node as BoardNode } from '../../functions'
import Piece from '../piece';

const Node = ({node,idx}) => {
    const light = isLightSquare(node.square,idx);

    return (
    <div className={`node ${light ? 'light' : 'dark'}`}>
        <Piece square={node.square} name={node.piece} />
    </div>)
    ;
};

Node.prototype = {
    node: PropTypes.instanceOf(BoardNode).isRequired,
    idx: PropTypes.number.isRequired,
};

export default Node;