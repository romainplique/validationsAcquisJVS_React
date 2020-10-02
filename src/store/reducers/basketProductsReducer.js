import {
    GET_ALL_BASKET_PRODUCTS,
    ADD_PRODUCT_TO_BASKET,
    REMOVE_PRODUCT_FROM_BASKET,
    UPDATE_PRODUCT_QUANTITY,
} from '../constants/actionsTypes';

const initialState = {
    basketProductList: [],
};

export default function basketProductReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_BASKET_PRODUCTS:
            return {
                ...state,
                basketProductList: [...action.basketProductList],
            };
        case ADD_PRODUCT_TO_BASKET:
            return {
                ...state,
                basketProductList: [...state.basketProductList, action.basketProduct],
            };
        case REMOVE_PRODUCT_FROM_BASKET: {
            const {
                basketProduct,
            } = action;
            const {
                id,
            } = basketProduct;
            return {
                ...state,
                basketProductList: state.basketProductList.filter(
                    (item) => item.id !== id,
                ),
            };
        }
        case UPDATE_PRODUCT_QUANTITY: {
            const {
                basketProduct,
            } = action;
            const {
                id,
            } = basketProduct;
            // On cherche l'indice de l'élément dans la panier
            const index = state.basketProductList.findIndex((basketProductItem) => basketProductItem.id === id);
            // On récupère le panier actuel
            const replacedItemBasketProductList = [...state.basketProductList];
            // On remplace l'élément du panier par le nouveau qui a la quantité décrémentée
            replacedItemBasketProductList[index] = basketProduct;
            return {
                ...state,
                basketProductList: replacedItemBasketProductList,
            };
        }
        default:
            return state;
    }
}
