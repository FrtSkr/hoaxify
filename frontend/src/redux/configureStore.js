import { legacy_createStore as createStore } from 'redux';
import authReducer from './authReducer';



const configureStore = () => {

    let loggedInState = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
    }

    const hoaxAuth = localStorage.getItem('hoax-auth');

    if (hoaxAuth) {
        try {
            loggedInState = JSON.parse(hoaxAuth)
        } catch (error) {
            console.log(error);
        }
    }

    const store = createStore(authReducer, loggedInState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

    store.subscribe(() => {
        localStorage.setItem('hoax-auth', JSON.stringify(store.getState()));
    })

    return store;
}

export default configureStore;