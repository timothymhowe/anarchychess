const types = {
    SET_OPEN_APPS: 'SET_OPEN_APPS',
    SET_MIN_APPS: 'SET_MIN_APPS',
    SET_FOCUSED: 'SET_FOCUSED',


    OPEN_APP: 'OPEN_APP'
}

/**
 * 
 * @param {*} name 
 */
export const open_app = (name) => {
    type:types.OPEN_APP,
    name
};