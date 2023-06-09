import React, {useState} from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import './taskbar-styles.css'
// importing react95 components for styling the page
import { Button, Frame, Toolbar, Window, WindowContent, WindowHeader, styleReset, ScrollView, AppBar, MenuList,MenuListItem, Separator } from 'react95';
/* Original Windows95 font (optional) */
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';


const Taskbar = ({}) => {
    const [open,setOpen] = useState(false);

    let imageUrl;
    try {
        // console.log(`/assets/pieces/${imageName}.png`)
        imageUrl = new URL(`../../assets/icons/win/start/22x.png`, import.meta.url).href;
    } catch (error) {
        console.log(error)
    } 


    return(
        <AppBar style={{top:"unset",bottom:0}} className='taskbar'>
            <Toolbar style={{ justifyContent: 'space-between' }} >
                <div style={{position:'relative', display:'inline-block'}}>
                <Button onClick={() => setOpen(!open)} active={open} style={{fontWeight:'bold'}} >
            <img src={imageUrl} alt='' style={{ height: '22px', marginRight: 4 }}
            />
            Start
          </Button>

          {open && (
            <MenuList 
            style={{
                position:'absolute',
                left:'0',
                bottom:'100%',                
            }}
            onClick={() => setOpen(false)}
          >
          <MenuListItem>
          <span role='img' aria-label='👨‍💻'>
            👨‍💻
          </span>
          Profile
        </MenuListItem>
        <MenuListItem>
          <span role='img' aria-label='📁'>
            📁
          </span>
          My account
        </MenuListItem>
        <Separator />
        <MenuListItem disabled>
          <span role='img' aria-label='🔙'>
            🔙
          </span>
          Logout
        </MenuListItem>
      </MenuList>
          )}
                </div>

        <Frame variant='well' style={{padding:".3rem .5rem"}}>
            June 9, 4:20 PM
        </Frame>
            </Toolbar>
        </AppBar>
    )
}

Taskbar.prototype = {

};

export default Taskbar;