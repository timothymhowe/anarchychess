import React, {useState, useEffect } from 'react';

import Layout from '../../components/layout'
import './home-styles.css';
import ShareButtons from '../../components/sharebuttons'
import Button from '../../components/button'

const Form = () => {
    const [name, setName] = useState('');
    const [gameID, setGID] = useState('');

    useEffect (() => {

        // generates a random number to be the GID
        const id = Math.random().toString.replace('0.','');
        setGID(id);
    }, []);

    const handleSubmit = (event) =>
    {
        event.preventDefault();
    };

    return (
        <div>
            <h2>Anarchy Chess</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                    placeholder="Display Name"
                />
                <div className="gameId">Game ID: {gameID}</div>
                <hr />
                <p className="invite">Challenge your friends to a game of AnarchyChess</p>
                <ShareButtons
                    shareText={`https://anarchychess.io?id=${gameID}`}
                    subject="AnarchyChess has arrived"
                />

                <Button>Create Game</Button>
            </form>
        </div>
    )
}

const Home = () => {
    const Image = () => (
        <img src={require('../../assets/home.jpg')}alt="home" className="bg-img" />
        );
        return <Layout Content={Form} Image={Image} />;
    };
    
export default Home;
