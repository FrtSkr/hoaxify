import * as ACTIONS from './Constants';

export const logoutSuccess = () => {
    return {
        type: ACTIONS.LOGOUT_SUCCES
    };
};

export const loginSuccess = (authState) => {
    return {
        type: ACTIONS.LOGIN_SUCCES,
        payload: authState
    };
};