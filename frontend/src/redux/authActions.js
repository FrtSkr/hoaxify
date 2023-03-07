import * as ACTIONS from './Constants';
import { login } from '../api/apiCalls';

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

export const loginHandler = credentials => {
    return async function (dispatch) {
        const response = await login(credentials);
        const authState = {
            ...response.data,
            password: credentials.password,
            isLoggedIn: true
        };
        dispatch(loginSuccess(authState));
        return response;
    };
};