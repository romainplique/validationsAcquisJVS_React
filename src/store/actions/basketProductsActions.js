import Axios from 'axios';
import {
    GET_ALL_BASKET_PRODUCTS,
    ADD_PRODUCT_TO_BASKET,
    REMOVE_PRODUCT_FROM_BASKET,
    UPDATE_PRODUCT_QUANTITY,
} from '../constants/actionsTypes';

export const getAllBasketProducts = () => (dispatch) => {
    Axios.get('/api/basketproducts/').then(({ data }) => {
        dispatch({
            type: GET_ALL_BASKET_PRODUCTS,
            basketProductList: data,
        });
    });
};

export const addProductToBasket = (
    idProduct,
    quantity,
) => (dispatch) => {
    Axios.post('/api/basketproducts/', {
        idProduct,
        quantity,
    }).then(({ data }) => {
        console.log(data);
        dispatch({
            type: ADD_PRODUCT_TO_BASKET,
            basketProduct: data,
        });
    });
};

export const removeProductFromBasket = (
    idBasketProduct,
) => (dispatch) => {
    Axios.delete(`/api/basketproducts/${idBasketProduct}`).then(({ data }) => {
        dispatch({
            type: REMOVE_PRODUCT_FROM_BASKET,
            basketProduct: data,
        });
    });
};

export const updateBasketProductQuantity = (
    idBasketProduct,
    quantity,
) => (dispatch) => {
    console.log(idBasketProduct, quantity);
    Axios.patch(`/api/basketproducts/${idBasketProduct}`, {
        quantity,
    }).then(({ data }) => {
        console.log(data);
        dispatch({
            type: UPDATE_PRODUCT_QUANTITY,
            basketProduct: data,
        });
    });
};
