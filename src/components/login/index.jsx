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
            <WindowHeader className='login-header'>
            Sign In
            </WindowHeader>

            <WindowContent className='login-content'>

            <div className='login-row'>
            <span>
                Username/Email:
            </span>
            <TextInput id='uname' onChange={(x) => setName(x)}  inputMode='email' autoComplete='off'>

            </TextInput>
            </div>

            <div className='box-divider' />

            <div className='login-row'>
            <span>
                Game ID:
            </span>
            <TextInput id='gid' onChange={(x) => setGID(x)}  inputMode='numeric' autoComplete='off'>

            </TextInput>
            </div>

            <Checkbox label='Remember Me?'>
            </Checkbox>
            </WindowContent>
            <div id='login-buttons'>
                <Button label='Login' onClick={onClick}>
                    Login
                </Button>
                
            </div>


        </Window>
    )

}

export default Login;


