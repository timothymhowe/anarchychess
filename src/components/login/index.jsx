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





const Login = () =>{

    const [uname, setUname] = useState();

    

    return (
        <Window >
            <WindowHeader className='login-header'>
            Hello world!
            
            </WindowHeader>

            <WindowContent className='login-content'>
            <TextInput id='uname'>

            </TextInput>


            <TextInput id='pass'>

            </TextInput>

            <Checkbox label='Remember Me?'>

            </Checkbox>
            </WindowContent>
            <div id='login-buttons'>
                <Button label='Login' />
                
            </div>


        </Window>
    )

}

export default Login;


