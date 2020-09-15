import {
    GET_ALL_PRODUCTS,
    UPDATE_PRODUCT,
    CREATE_PRODUCT,
} from '../constants/actionsTypes';

const initialState = {
    productList: [],
    currentPage: 0,
    lastPage: 0,
};

export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                productList: [...action.productList],
                currentPage: action.currentPage,
                lastPage: action.lastPage,
            };
        case CREATE_PRODUCT:
            console.log(action);
            return {
                ...state,
                // productList: [...action.productList, action.createdProduct],
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
