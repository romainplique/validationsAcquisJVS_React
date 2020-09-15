import Axios from 'axios';
import {
    GET_ALL_PRODUCTS,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
} from '../constants/actionsTypes';

export const getAllProducts = (page) => (dispatch) => {
    Axios.get(`/api/products/?page=${page}`).then(({ data }) => {
        dispatch({
            type: GET_ALL_PRODUCTS,
            productList: data.data,
            currentPage: data.current_page,
            lastPage: data.last_page,
        });
    });
};

export const updateProduct = (id) => (dispatch) => {
    Axios.patch(
        `/api/products/${id}`,
    ).then(({ data }) => {
        dispatch({
            type: UPDATE_PRODUCT,
            product: data.data,
        });
    }).catch(({ error }) => {
        console.log(error);
    });
};

export const createProduct = (
    name,
    description,
    price,
    image,
) => (dispatch) => {
    console.log(name, description, price, image);
    Axios.post('/api/products', {
        name,
        description,
        price,
        image,
    }).then(({ data }) => {
        console.log(data);
        dispatch({
            type: CREATE_PRODUCT,
            product: data.data,
        });
    });
};
