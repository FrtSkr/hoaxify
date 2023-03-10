import * as ACTIONS from './Constants';

const defaultState = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined
}



const authReducer = (state = { ...defaultState }, action) => {
    if (action.type === ACTIONS.LOGOUT_SUCCES) {
        return defaultState;
    }
    if (action.type === ACTIONS.LOGIN_SUCCES) {
        const { isLoggedIn, username, displayName, image, password } = action.payload;
        state = {
            isLoggedIn: isLoggedIn,
            username: username,
            displayName: displayName,
            image: image,
            password: password

        }
        return state;
    }
    return state;
};

export default authReducer;