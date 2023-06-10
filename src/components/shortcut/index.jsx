import {Button} from 'react95'
import React, {useState} from 'react'
import './shortcut-styles.css'

import {PropTypes} from 'prop-types';

const Shortcut = ({iconName, label}) => {
    const imageUrl = new URL(`../../assets/icons/${iconName}/48x.png`, import.meta.url).href;

    // const [hasFocus, setHasFocus] = useState({status:false, className:'shortcut-text'})
     const handleClick = () => {
    //         // setHasFocus({status:true,className:'shortcut-text'})
     }

    const handleDoubleClick = () => {

    }


    return(
        <button onClick={handleClick} onDoubleClick={handleDoubleClick} className='shortcut' >
            <img src={imageUrl} className='shortcut-icon'/>
            <span className='shortcut-text' style={{fontSize:'14pt'}}>
                {label}
            </span>
        </button>



    );
}

Shortcut.prototype = {
    iconName: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
}

export default Shortcut;