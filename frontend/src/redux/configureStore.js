import { legacy_createStore as createStore } from 'redux';
import authReducer from './authReducer';

const loggedInState = {
    isLoggedIn: true,
    username: "admin",
    displayName: "displayAdmin",
    image: null,
    password: "Admin"
}

const configureStore = () => {
    return createStore(authReducer, loggedInState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

export default configureStore;