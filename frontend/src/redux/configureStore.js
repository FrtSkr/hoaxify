import { applyMiddleware, legacy_createStore as createStore, compose } from 'redux';
import authReducer from './authReducer';
import SecurLS from 'secure-ls';
import thunk from 'redux-thunk';
import { setAuthorizationHeader } from '../api/apiCalls';

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
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(authReducer, getStateFromStorage(), composeEnhancers(applyMiddleware(thunk)));

    store.subscribe(() => {
        updateStateInStorage(store.getState());
        setAuthorizationHeader(store.getState());
    })

    return store;
}

export default configureStore;