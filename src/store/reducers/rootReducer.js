import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import basketProductsReducer from './basketProductsReducer';

export default combineReducers({ productsReducer, basketProductsReducer });
