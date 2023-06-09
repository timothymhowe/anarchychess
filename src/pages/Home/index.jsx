import React, {useState, useEffect } from 'react';

import Layout from '../../components/layout'
import './home-styles.css';
import ShareButtons from '../../components/sharebuttons'
import Button from '../../components/button'

// router imports 
import { useNavigate, useLocation } from 'react-router-dom';

import qs from 'query-string'

const Form = () => {
    const [name, setName] = useState('');
    const [GID, setGID] = useState('');
    const nav = useNavigate();
    
    // get the current page URL
    const location = useLocation();

    const {id: inviteID} = qs.parse(location.search);

    useEffect (() => {
        
        // if the invite already has an ID number, join that game
        if (inviteID){
            return setGID(inviteID);
        } 

        // generates a random number to be the GID
        const id = Math.random().toString().replace('0.','');
        setGID(id);
    }, [inviteID]);

    const handleSubmit = (event) =>
    {
        event.preventDefault();

        // if either name or GID are empty, don't do anything
        if (!name || !GID){
            return;
        }
        nav(`/game?name=${name}&id=${GID}`)
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
                <div className="gameId">Game ID: {GID}</div>
                <hr />
                <p className="invite">Challenge your friends to a game of AnarchyChess</p>
                <ShareButtons
                    shareText={`https://anarchychess.io?id=${GID}`}
                    subject="Anarchy Chess"
                    />

                <Button onClick={handleSubmit}>Start Game...</Button>
            </form>
        </div>
    )
}

const Home = () => {
    const Image = () => (
        <img src={import('/assets/home.jpg')} alt="home" className="bg-img" />
        );
        return <Layout Content={Form} Image={Image} />;
    };
    
export default Home;
