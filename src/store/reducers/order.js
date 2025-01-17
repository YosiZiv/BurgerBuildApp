import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility'
const initialState = {
    orders: [],
    loading: false,
    purchased: true
}

const purchaseInit = (state, action) => {
    return updateObject(state,{purchased: false});
}
const purchaseBurgerStart = (state, action) => {
    return updateObject(state, {loading: true});
}
const purchaseBurgerSuccsess = (state, action) => {
    const newOrder = updateObject(action.orderData, {id: action.orderId})
    return updateObject(state,{ loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
    });
}
const purchaseBurgerFailed = (state, action) => {
    return updateObject(state, {loading: false})
}

const fatchOrderStart = (state, action) => {
    return updateObject(state,{loading: true});
}
const fetchOrderSuccsess = (state, action) => {
    return updateObject(state,{
        orders: action.orders,
        loading: false } )

}
const fatchOrderFail = (state, action) => {
    return updateObject(state,{loading: false})

}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_START:  return purchaseBurgerStart(state, action)
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccsess(state, action)
        case actionTypes.PURCHSE_BURGER_FAILED: return purchaseBurgerFailed(state, action)
        case actionTypes.FATCH_ORDERS_START: return fatchOrderStart(state, action);
        case actionTypes.FATCH_ORDERS_SUCCSESS: return fetchOrderSuccsess(state, action)
        case actionTypes.FATCH_ORDERS_FAIL: return fatchOrderFail(state, action)
        default: return state;
    }
};
export default reducer;