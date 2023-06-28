import React from 'react';
import './App.css';
import Game from './pages/Game';
import Home from './pages/Home';
// import { DndProvider } from 'react-dnd'
// import {HTML5Backend} from 'react-dnd-html5-backend'

import { GameProvider } from './context/GameContext';
import {ThemeProvider} from 'styled-components';
import original from "react95/dist/themes/original";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import GlobalStyle from './globalstyles';


function App() {
	return (
		
		<Router>
			<GlobalStyle />
			<ThemeProvider theme={original}>

			<GameProvider>
				<Routes>
					<Route path="/" exact element={<Home/>} />
					<Route path="/game" element={<Game />} />
				</Routes>
			</GameProvider>
			</ThemeProvider>
		</Router>
	);
}

export default App;
