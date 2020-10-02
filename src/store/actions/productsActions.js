import Axios from 'axios';
import {
    GET_ALL_PRODUCTS,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    GET_PRODUCT,
} from '../constants/actionsTypes';

export const getAllProducts = () => (dispatch) => {
    Axios.get('/api/products/').then(({ data }) => {
        dispatch({
            type: GET_ALL_PRODUCTS,
            productList: data,
        });
    });
};

export const getProduct = (idProduct) => (dispatch) => {
    Axios.get(`/api/products/${idProduct}`).then(({ data }) => {
        dispatch({
            type: GET_PRODUCT,
            product: data,
        });
    });
};

export const updateProduct = (id) => (dispatch) => {
    Axios.patch(
        `/api/products/${id}`,
    ).then(({ data }) => {
        dispatch({
            type: UPDATE_PRODUCT,
            product: data,
        });
    });
};

export const createProduct = (
    name,
    description,
    price,
    image,
) => (dispatch) => {
    Axios.post('/api/products', {
        name,
        description,
        price,
        image,
    }).then(({ data }) => {
        dispatch({
            type: CREATE_PRODUCT,
            product: data,
        });
    });
};
