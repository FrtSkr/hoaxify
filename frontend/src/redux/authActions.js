import * as ACTIONS from './Constants';
import { login, logout, signup } from '../api/apiCalls';



export const logoutSuccess = () => {
    return async function(dispatch){
        try{
            await logout();
        }catch(err){

        }
        dispatch({
            type: ACTIONS.LOGOUT_SUCCES
        })
    }
};

export const loginSuccess = (authState) => {
    return {
        type: ACTIONS.LOGIN_SUCCES,
        payload: authState
    };
};

export const updateSuccess = ({ displayName, image }) => {
    return {
        type: ACTIONS.UPDATE_SUCCESS,
        payload: {
            displayName,
            image
        }
    };
}

export const loginHandler = credentials => {
    return async function (dispatch) {
        const response = await login(credentials);
        const authState = {
            ...response.data.user,
            password: credentials.password,
            token: response.data.token,
            isLoggedIn: true
        };
        dispatch(loginSuccess(authState));
        return response;
    };
};

export const signupHandler = user => {
    return async function (dispatch) {
        const response = await signup(user);
        await dispatch(loginHandler(user));
        return response;
    }
}