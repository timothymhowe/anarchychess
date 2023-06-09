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



const Piece = ({ name, square, setFromSquare, preview}) => {
    const full_name = piece_dict[name.toUpperCase()]
    const color = name === name.toUpperCase() ? 'w' : 'b'
    const imageName = color + "_" + full_name;
    const element = useRef();
    let imageUrl;

    try {
        // console.log(`/assets/pieces/${imageName}.png`)
        imageUrl = new URL(`../../assets/pieces/${imageName}.png`, import.meta.url).href;
    } catch (error) {
        console.log(error)
    }

    const handleDragStart=()=>{
        setFromSquare(square);
        setTimeout(() => {
            element.current.style.display = 'none';
            // document.getElementsByClassName('board').style.cursor = 'none'

        }, 0);
    };
    const handleDragEnd = () => {
        element.current.style.display = 'block';
    };

    return (
    <div role={preview ? 'PiecePreview' : 'Piece'}>
    <img className={full_name} src={imageUrl} alt="" ref={element} draggable={true} onDragStart={handleDragStart} onDragEnd={handleDragEnd}/>
    </div>
    );
};

Piece.prototype = {
    name: PropTypes.string.isRequired,
    square: PropTypes.string.isRequired,
};

export default Piece;