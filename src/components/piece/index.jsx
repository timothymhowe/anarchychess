import React, {useRef} from "react";
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

const Piece = ({ name, square, setFromSquare}) => {
    const color = name === name.toUpperCase() ? 'w' : 'b'
    const imageName = color + "_" + piece_dict[name.toUpperCase()];
    const element = useRef();
    let image;

    try {
        image = require(`../../assets/pieces/${imageName}.png`);
    } catch (error) {
        image = ''; // empty image just in case
    }

    const handleDragStart=()=>{
        setFromSquare(square);
        setTimeout(() => {
            element.current.style.display = 'none';
        }, 0);
    };
    const handleDragEnd = () => {
        element.current.style.display = 'block';
    };

    return (
    <div>
    <img className={piece_dict[name.toUpperCase()]} src={image} alt="" ref={element} draggable={true} onDragStart={handleDragStart} onDragEnd={handleDragEnd}/>
    </div>
    );
};

Piece.prototype = {
    name: PropTypes.string.isRequired,
    square: PropTypes.string.isRequired,
};

export default Piece;