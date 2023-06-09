import React from 'react';
import './App.css';
import Game from './pages/Game';
import Home from './pages/Home';
import { DndProvider } from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'

import { GameProvider } from './context/GameContext';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<Router>
			{/* <DndProvider> */}
			<GameProvider>
				<Routes>
					<Route path="/" exact element={<Home/>} />
					<Route path="/game" element={<Game />} />
				</Routes>
			</GameProvider>
			{/* </DndProvider> */}
		</Router>
	);
}

export default App;
