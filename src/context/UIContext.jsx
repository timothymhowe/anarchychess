import React, {createContext, useReducer} from 'react';
import UIReducer from'./UIReducer';

const INITIAL_STATE = {
    runningApps: [''],
    focusedApp: '',
    minimizedApps:[],
    winTheme: 'default',
    loggedIn: false,
}


export const UIContext = createContext(INITIAL_STATE);

export const UIProvider = ({children}) =>{
    const [state, dispatch] = useReducer(UIReducer,INITIAL_STATE);

    return (
        <UIContext.Provider value = {{ ...state, dispatch }}>
            {children}
        </UIContext.Provider>
    );
};

