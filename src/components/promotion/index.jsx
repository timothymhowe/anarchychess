import React, {useEffect, useState, useRef} from "react";
import {Window, WindowContent, Handle, Separator, MenuList, MenuListItem, Button} from "react95";
import Draggable from 'react-draggable'
import styled from 'styled-components'
import ReactModal from 'react-modal'
import './promotion-styles.css'


const PromotionWindow = ({makeMove:makeMove, promote:promote, boardRef:boardRef}) => {


    const menuRef = useRef();

    const [color, setColor] = useState('w')

    // useEffect(() => {
    //     console.log('promote changed to '+ promote)
    // },[promote])

    const checkColor = () => {
        setColor (promote.indexOf('8') > -1 ? 'w' : 'b');
    }

    const setPromotionPiece = (piece) => {
        console.log('oops ' + promote + " " + piece)
        // makeMove(promote,piece);
    }

    return (
        // TODO get the app element passed to the modal so that aria properly works.
        <ReactModal overlayClassName='promotion-modal-overlay' className='promotion-modal' isOpen={promote ? true : false} onAfterOpen={checkColor} ariaHideApp={false} 
        style={{
          
        }}
        >
        <Draggable nodeRef={menuRef}>

        <MenuList inline className="promo-menu" ref={menuRef} style={{bottom:boardRef.current?.top, right:boardRef.current?.left}}>
            <MenuListItem  onClick={setPromotionPiece('q')} className="promote-button">
                <img src= {new URL(`../../assets/pieces/${color}_queen.png`, import.meta.url).href} className="promo-piece" draggable={false}/>
            </MenuListItem>

            <MenuListItem onClick={setPromotionPiece('r')}>
                <img src= {new URL(`../../assets/pieces/${color}_rook.png`, import.meta.url).href} className="promo-piece" draggable={false}/>
            </MenuListItem>

            <MenuListItem onClick={setPromotionPiece('b')}>
                <img src= {new URL(`../../assets/pieces/${color}_bishop.png`, import.meta.url).href} className="promo-piece" draggable={false}/>
            </MenuListItem>

            <MenuListItem onClick={setPromotionPiece('k')}>
                <img src= {new URL(`../../assets/pieces/${color}_knight.png`, import.meta.url).href} className="promo-piece" draggable={false}/>
            </MenuListItem>

            <MenuListItem onClick={(e) => console.log(e)}>
                ...?
            </MenuListItem>
        </MenuList>
        </Draggable>
        </ReactModal>
        

        //   <ReactModal isOpen={promote} onAfterOpen={checkColor}>
        
        //     <Button  onClick={setPromotionPiece('q')}>
        //         <img src= {new URL(`../../assets/pieces/${color}_queen.png`, import.meta.url).href} className="promo-piece"/>
        //     </Button>

        //     <Button onClick={setPromotionPiece('r')}>
        //         <img src= {new URL(`../../assets/pieces/${color}_rook.png`, import.meta.url).href} className="promo-piece"/>
        //     </Button>

        //     <Button onClick={setPromotionPiece('b')}>
        //         <img src= {new URL(`../../assets/pieces/${color}_bishop.png`, import.meta.url).href} className="promo-piece"/>
        //     </Button>

        //     <Button onClick={setPromotionPiece('k')}>
        //         <img src= {new URL(`../../assets/pieces/${color}_knight.png`, import.meta.url).href} className="promo-piece"/>
        //     </Button>

        //     <Button onClick={(e) => console.log(e)}>
        //         ...?
        //     </Button>
       
        // </ReactModal>

);
}

    export default PromotionWindow;

