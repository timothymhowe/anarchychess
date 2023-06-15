import React, {useState, useRef} from "react";
import {Window, WindowContent, Handle, Separator, MenuList, MenuListItem} from "react95";
import styled from 'styled-components'


const PromotionWindow = (color,setPromotionPiece) => {

    

    return (
        <MenuList>
            <MenuListItem onClick={setPromotionPiece('q')}>
                <img src= {new URL(`../../assets/pieces/${color}_queen.png`, import.meta.url).href} className="promo-piece"/>
            </MenuListItem>

            <MenuListItem onClick={setPromotionPiece('r')}>
                <img src= {new URL(`../../assets/pieces/${color}_rook.png`, import.meta.url).href} className="promo-piece"/>
            </MenuListItem>

            <MenuListItem onClick={setPromotionPiece('b')}>
                <img src= {new URL(`../../assets/pieces/${color}_bishop.png`, import.meta.url).href} className="promo-piece"/>
            </MenuListItem>

            <MenuListItem onClick={setPromotionPiece('k')}>
                <img src= {new URL(`../../assets/pieces/${color}_knight.png`, import.meta.url).href} className="promo-piece"/>
            </MenuListItem>

            <MenuListItem onClick={(e) => console.log(e)}>
                ...?
            </MenuListItem>



        </MenuList>

    );

    export default PromotionWindow;

}