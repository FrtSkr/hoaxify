import { legacy_createStore as createStore } from 'redux';
import authReducer from './authReducer';
import SecurLS from 'secure-ls';

const secureLs = new SecurLS();

const getStateFromStorage = () => {
    const hoaxAuth = secureLs.get('hoax-auth');
    let loggedInState = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
    }

    if (hoaxAuth) {
        return hoaxAuth;
    }
    return loggedInState
}

const updateStateInStorage = newState => {
    secureLs.set('hoax-auth', newState);

}


const configureStore = () => {
    const store = createStore(authReducer, getStateFromStorage(), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

    store.subscribe(() => {
        updateStateInStorage(store.getState());
    })

    return store;
}

export default configureStore;