import { Button } from 'react95'
import React, { useState } from 'react'
import './shortcut-styles.css'

import { PropTypes } from 'prop-types';

const Shortcut = ({ iconName, label, size, hasOverlay }) => {
    const imageUrl = new URL(`../../assets/icons/${iconName}/${size}x.png`, import.meta.url).href;
    const overlayURL = new URL(`../../assets/icons/shortcut-overlay/${size}x.png`, import.meta.url).href;

    // const [hasFocus, setHasFocus] = useState({status:false, className:'shortcut-text'})
    const handleClick = () => {
        //         // setHasFocus({status:true,className:'shortcut-text'})
    }

    const handleDoubleClick = () => {

    }


    return (
        <button onClick={handleClick} onDoubleClick={handleDoubleClick} className='shortcut' >
            <img src={imageUrl} className='shortcut-icon' draggable='false' />
            <img src={overlayURL} className='shortcut-overlay' style={{ visibility: (hasOverlay ? 'visible' : 'hidden') }} draggable={false} />
            <span className='shortcut-text' style={{ fontSize: '14pt' }}>
                {label}
            </span>
        </button>



    );
}

Shortcut.prototype = {
    iconName: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
}

export default Shortcut;