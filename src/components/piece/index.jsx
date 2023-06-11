import React, {useRef, useState, useEffect} from "react";
import ReactDOM from 'react-dom';
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



const Piece = ({ name, square, setFromSquare, boardRef}) => {

    const full_name = piece_dict[name.toUpperCase()]
    const color = name === name.toUpperCase() ? 'w' : 'b'
    const imageName = color + "_" + full_name;
    const element = useRef();
    
    const [isDragging, setIsDragging] = useState({status:false,zIndex:1000,filter:'',cursor:'grab',})
    const [dragBoundary, setDragBoundary] = useState({left:0,top:0,right:0,bottom:0})

    const [pieceOrigin, setPieceOrigin] = useState({x:0,y:0})


    let imageUrl;

    // get the location of the piece image so that it can be passed to the DOM
    try {
        imageUrl = new URL(`../../assets/pieces/${imageName}.png`, import.meta.url).href;
    } catch (error) {
        console.log(error)
    }



    useEffect(() => {
            const newBounds = getBounds(boardRef,element);
            setDragBoundary(newBounds);
    },
    []);

    // handles the start up of the drag event
    const handleDragStart=()=>{
        
        
        setFromSquare(square);
        setIsDragging({status:true, zIndex:isDragging.zIndex + 1,filter:'drop-shadow(3px 3px 2px #202020)',cursor:'grabbing'})
    };

    const handleDragEnd = () => {
        element.current.style.display = 'block';
        setIsDragging({status:false, zIndex:INITIAL_Z,filter:'',cursor:'grab'})
        setPieceOrigin({x:element.current.getBoundingClientRect().x,y:element.current.getBoundingClientRect().y})
    };

    return (
        // <div style={{top:dragBoundary.top, bottom:dragBoundary.bottom,left:dragBoundary.left,right:dragBoundary.right, border:'red dotted thin'}}>

    <Draggable onStart={handleDragStart} onStop={handleDragEnd} bounds={dragBoundary} defaultPosition={pieceOrigin} offsetParent={boardRef.current}>
    <img className={"piece " + full_name} src={imageUrl} alt="" ref={element} draggable={false} style={{zIndex:isDragging.zIndex,position:'relative',filter:isDragging.filter,cursor:isDragging.cursor,imageRendering:'crisp-edges'}}/>
    </Draggable>
    
    // </div>

    );
};

Piece.prototype = {
    name: PropTypes.string.isRequired,
    square: PropTypes.string.isRequired,
    setFromSquare: PropTypes.func,
    bounds: PropTypes.object,
};

    // helper function for getting and calculating the bounding box of the chess window
function getBounds (boardRef, pieceRef)  {
    const boardBox = boardRef.current.getBoundingClientRect();
    const pieceBox = pieceRef.current.getBoundingClientRect();
    let left, top, right, bottom;
    left = boardBox.left - pieceBox.left;
    top = boardBox.top - pieceBox.top;
    right = left + boardBox.width - pieceBox.width;
    bottom = top + boardBox.height - pieceBox.height;
    return ({left:left, top:top, right:right, bottom:bottom})
}



export default Piece;