import {
    GET_ALL_PRODUCTS,
    UPDATE_PRODUCT,
    CREATE_PRODUCT,
    GET_PRODUCT,
} from '../constants/actionsTypes';

const initialState = {
    productList: [],
    productDetail: null,
    currentPage: 0,
    lastPage: 0,
};

export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                productList: [...action.productList],
            };
        case GET_PRODUCT:
            return {
                ...state,
                productDetail: action.product,
            };
        case CREATE_PRODUCT:
            return {
                ...state,
            };
        case UPDATE_PRODUCT:
            return {
                ...state,
                productList: [...action.productList],
            };
        default:
            return state;
    }
}
