import React from 'react';
import './App.css';
import Game from './pages/Game';
import Home from './pages/Home';
import { GameProvider } from './context/GameContext';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<Router>
			<GameProvider>
				<Routes>
					<Route path="/" exact element={<Home/>} />
					<Route path="/game" element={<Game />} />
				</Routes>
			</GameProvider>
		</Router>
	);
}

export default App;
