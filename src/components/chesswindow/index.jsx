import React, {useRef} from "react";
import { Button, Frame, Toolbar, Window, WindowContent, WindowHeader, styleReset, ScrollView } from 'react95';
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Draggable from "react-draggable";
import PropTypes from 'prop-types'

import './chesswindow-styles.css';

import Board from '../board';


const ChessWindow = ({board, makeMove, setFromSquare}) => {
    const tempRef = useRef(); // per react-draggable API, im trying to fix warning thrown by react about deprecated FindDOMNode
    const tempRef2 = useRef(); // per react-draggable API, im trying to fix warning thrown by react about deprecated FindDOMNode
    const tempRef3 = useRef(); // per react-draggable API, im trying to fix warning thrown by react about deprecated FindDOMNode


    return (
        <Draggable bounds='parent' handle=".window-title" nodeRef={tempRef}>
        <Window className="window" ref={tempRef}>
            <WindowHeader className="window-title" style={{height:'30px'}}>
                <span>
                    <span role='img' style={{height:'100%', paddingLeft:'2px',paddingRight:'5px',textalign:'center'}}>
                        <img src={new URL(`../../assets/icons/anarchy/16x.png`, import.meta.url).href} 
                        style={{height:'16px',width:'16px',marginTop:'2px', imageRendering:'pixelated'}}/>
                    </span>
                        AnarchyChess.exe
                </span> 
                <div className="window-button-panel">


                    {/* Trying to get the buttons to not be able to drag the window around. */}
                    <Draggable onStart={()=>false} nodeRef={tempRef2}>
                      <Button style={{height:'25px',width:'25px',marginTop:'3px', marginRight:'2px'}} className="window-button" ref={tempRef2} select>
                          <span className="minimize-icon" />
                      </Button>
                    </Draggable>
                    <Draggable onStart={()=>false} nodeRef={tempRef3}>
                      <Button style={{height:'25px',width:'25px',marginTop:'3px'}} className="window-button" ref={tempRef3} select>
                          <span className="close-icon" />
                      </Button>
                    </Draggable>
                </div>
            </WindowHeader>

            <Toolbar>
          <Button variant='menu' size='sm'>
            File
          </Button>
          <Button variant='menu' size='sm'>
            Edit
          </Button>
          <Button variant='menu' size='sm' disabled>
            Save
          </Button>
          <Button variant='menu' size='sm'>
            Settings
          </Button>
        </Toolbar>

            <div className='window-content'>
                        
                    {/* <Player name={player} color={playerColor} player />
                    <Player name={opponentName} color={playerColor === 'w' ? 'b' : 'w'} /> */}
                    <Board 
                        nodes={board} 
                        makeMove={makeMove} 
                        setFromSquare={setFromSquare} 
                    />
            </div>
            </Window>
            </Draggable>
    )
}

ChessWindow.prototype = {
    board:PropTypes.element.isRequired,
    makeMove:PropTypes.func.isRequired,
    setFromSquare:PropTypes.func.isRequired,
}

export default ChessWindow;