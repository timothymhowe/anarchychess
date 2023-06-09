import React from "react";
import './player-styles.css'

const Player = ({ name, color, player}) =>{
    const white = color === 'w';
    const imageName = white ? 'w_king' : 'b_king';

    return (
        <div className={`player ${player ? 'you' : 'opponent'}`}>
        <p>{name}</p>
        <img src={new URL(`../../assets/pieces/${imageName}.png`, import.meta.url).href} alt="King" className="kingMe" />
        </div>
    );
};

export default Player;