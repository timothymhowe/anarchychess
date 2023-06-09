import { memo, useEffect, useState } from 'react'
const styles = {
    display: 'inline-block'
}

const piece_dict = {
    "B" : "bishop",
    "P" : "pawn",
    "K" : "king",
    "Q" : "queen",
    "N" : "knight",
    "R" : "rook"
    };

export const DragPreview = memo(function DragPreview({imageName,full_name}){
    imageUrl = new URL(`../../assets/pieces/${imageName}.png`, import.meta.url).href;

    return (
    <div>
    <img className={full_name} src={imageUrl} alt="" ref={element} draggable={true} onDragStart={handleDragStart} onDragEnd={handleDragEnd}/>
    </div>
    )
}