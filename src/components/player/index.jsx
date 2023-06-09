import React from "react";
import './player-styles.css'

const Player = ({ name, color, player}) =>{
    const white = color === 'w';
    const image = white ? 'w_king' : 'b_king';

    return (
        <div className={`player ${player ? 'you' : 'opponent'}`}>
        <p>{name}</p>
        <img src={require(`../../assets/pieces/${image}.png`)} alt="King" className="king" />
        </div>
    );
};

export default Player;