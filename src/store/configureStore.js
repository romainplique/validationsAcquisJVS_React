import {
    createStore,
    applyMiddleware,
    compose,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancer = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancer(applyMiddleware(thunkMiddleware)),
    );
    return store;
}
