import React, {useRef, useState} from "react";
import PropTypes from 'prop-types';
import './piece-styles.css';

import Draggable from 'react-draggable';

const INITIAL_Z = 1000;

const piece_dict = {
"B" : "bishop",
"P" : "pawn",
"K" : "king",
"Q" : "queen",
"N" : "knight",
"R" : "rook"
};



const Piece = ({ name, square, setFromSquare, bounds}) => {

    console.log(bounds)

    const full_name = piece_dict[name.toUpperCase()]
    const color = name === name.toUpperCase() ? 'w' : 'b'
    const imageName = color + "_" + full_name;
    const element = useRef();
    
    const [isDragging, setIsDragging] = useState({status:false,zIndex:1000,filter:'',cursor:'grab'})
    
    let imageUrl;

    try {
        // console.log(`/assets/pieces/${imageName}.png`)
        imageUrl = new URL(`../../assets/pieces/${imageName}.png`, import.meta.url).href;
    } catch (error) {
        console.log(error)
    }

    let top_bound, bottom_bound, left_bound, right_bound, rect, the_board;

    // setTimeout( () => {
    //      the_board = document.getElementsByClassName('board');
    // },20);

    
    try {
        // rect = the_board.getBoundingClientRect();
        // top_bound = rect.top;
        // bottom_bound = rect.bottom;
        // left_bound = rect.left;
        // right_bound = rect.right;
    
        console.log({left_bound,top_bound,right_bound,bottom_bound})
    } catch (error) {
        console.log(error)
    }

    const handleDragStart=()=>{
        setFromSquare(square);
        setIsDragging({...isDragging, status:true, zIndex:isDragging.zIndex + 1,filter:'drop-shadow(3px 3px 2px #202020)',cursor:'grabbing'})
        // setTimeout(() => {
        //     element.current.style.display = 'none';
        //     // document.getElementsByClassName('board').style.cursor = 'none'

        // }, 0);
    };
    const handleDragEnd = () => {
        element.current.style.display = 'block';
        setIsDragging({status:false, zIndex:INITIAL_Z,filter:'',cursor:'grab'})
        console.log('dragged to my boy')
    };

    return (
    <Draggable onStart={handleDragStart} onStop={handleDragEnd} bounds={bounds}>
    <img className={full_name} src={imageUrl} alt="" ref={element} draggable={false} style={{zIndex:isDragging.zIndex,position:'relative',filter:isDragging.filter,cursor:isDragging.cursor}}/>
    </Draggable>
    );
};

Piece.prototype = {
    name: PropTypes.string.isRequired,
    square: PropTypes.string.isRequired,
    setFromSquare: PropTypes.func,
    bounds: PropTypes.object,
};

export default Piece;