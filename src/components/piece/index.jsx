import React, { useRef, useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './piece-styles.css';

import Draggable from 'react-draggable';



const INITIAL_Z = 1000;

const piece_dict = {
    "B": "bishop",
    "P": "pawn",
    "K": "king",
    "Q": "queen",
    "N": "knight",
    "R": "rook"
};

/**
 * The chess piece.  Is wrapped in react-draggable.
 * 
 * @param {*} param0 
 * @returns 
 */
const Piece = ({ name, square, setFromSquare, boardRef, isMoving }) => {

    const tempRef = useRef(null); //to stop the STRICT Mode warning about findDOMMode being deprecated.

    const full_name = piece_dict[name.toUpperCase()]
    const color = name === name.toUpperCase() ? 'w' : 'b'
    const imageName = color + "_" + full_name;
    const element = useRef();

    const [isSelected, setIsSelected] = useState({ classNameSuffix: " piece", status: false})
    


    let imageUrl;

    // get the location of the piece image so that it can be passed to the DOM
    try {
        imageUrl = new URL(`../../assets/pieces/${imageName}.png`, import.meta.url).href;
    } catch (error) {
        console.log(error)
    }



    // handles the start up of the drag event
    const handleClick = (e) => {
        console.log("Picked up a " + full_name + " on " + square + "." )
        setFromSquare(square);

        if (!isSelected){
        setIsSelected({ classNameSuffix: " piece-clicked", status: true })
        } else {
            setIsSelected({classNameSuffix:" piece ", status:false})
        }
    };

    return (
    // <img onClick={(e) => handleClick(e)} className={(full_name + (color === 'b' ? ' black' : '') + isSelected.classNameSuffix)} src={imageUrl} alt="" ref={element} draggable={false}  />
    <img onClick={(e) => handleClick(e)} className={(full_name + (color === 'b' ? ' black' : '') + isSelected.classNameSuffix)} src={imageUrl} alt="" ref={element} draggable={false} style={{pointerEvents:(isMoving ? 'none' : 'auto')}} />
    );
};

Piece.prototype = {
    name: PropTypes.string.isRequired,
    square: PropTypes.string.isRequired,
    setFromSquare: PropTypes.func,
    bounds: PropTypes.object,
};





export default Piece;