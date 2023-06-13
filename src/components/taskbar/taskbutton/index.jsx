import React from 'react';
import { Button } from 'react95';
import PropTypes from 'prop-types';
import styled from "styled-components";

const name_dict ={
    'anarchy': 'AnarchyChess.exe',
    'mycomputer': 'My Computer',
    'recycle': 'Recycle Bin',
}

const TaskButton = ({name}) => {
    const app_name = (name in name_dict ? name_dict[name] : name);



    const handleClick = () => {


    }

    return( <Button onClick={handleClick} active:true> 
    <img src={new URL(`../../../assets/icons/${name}/16x.png`, import.meta.url).href} style={{paddingRight:'3px', imageRendering:'pixelated'}}/> {app_name}
    </Button>)
    
}

TaskButton.prototype={
    name: PropTypes.string.isRequired,
};

export default TaskButton;