import React, {useState, useRef, useEffect} from 'react'
import {Window,WindowContent,WindowHeader,TextInput, Button, Checkbox} from 'react95'
import './login-styles.css'

// import styled from 'styled-components'

// const StyledLoginWindow = styled.Window`

// `

// const StyledLoginContent = styled.WindowContent`

// `

// const StyledLoginButton = styled.Button`

// `





const Login = ({setName, setGID, onClick}) =>{  
    return (
        <Window className='login-window'>
            <WindowHeader className='login-header' style={{paddingLeft:'10px'}}>
            Sign In
            </WindowHeader>

            <WindowContent className='login-content'>

            <div className='input-label'>
                Username/Email:
            </div>

            <div className='input-container'>
            <TextInput id='uname' onChange={(x) => setName(x)}  inputMode='email' autoComplete='off' />
            </div>

            <div className='input-label'>
                Game ID:
            </div>
            
            
            <div className='input-container' id='gid-container'>
            <TextInput id='gid' onChange={(x) => setGID(x)}  inputMode='numeric' autoComplete='off' />
            </div>


            <div className='remember-me'>
            <Checkbox label='Remember Me?' />
            </div>
             
            <div id='login-buttons'>
                <Button label='Login' onClick={onClick} style={{width:'auto'}}>
                    Login
                </Button>
            </div>

            </WindowContent>
            </Window>
    )

}

export default Login;


