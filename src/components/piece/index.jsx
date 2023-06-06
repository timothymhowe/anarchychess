import React from "react";
import PropTypes from 'prop-types';
import './piece-styles.css';

const piece_dict = {
"B" : "bishop",
"P" : "pawn",
"K" : "king",
"Q" : "queen",
"N" : "knight",
"R" : "rook"
};

const Piece = ({ name, square}) => {
    const color = name === name.toUpperCase() ? 'w' : 'b'
    const imageName = color + "_" + piece_dict[name.toUpperCase()];
    let image;

    try {
        image = require(`../../assets/[pieces]${imageName}.png`);
    } catch (error) {
        image = require('../../assets/pieces/empty.png'); // empty image just in case
    }

    return (
    <img className="piece" src={image} alt="" draggable={true}/>
    );
};

Piece.prototype = {
    name: PropTypes.string.isRequired,
    square: PropTypes.string.isRequired,
};

export default Piece;