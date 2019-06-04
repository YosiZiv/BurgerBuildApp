import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {    
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
} 
export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHSE_BURGER_FAILED,
        error: error
    }
}
export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token , orderData)
        .then(respone => {  
            dispatch(purchaseBurgerSuccess(respone.data, orderData));
        }).catch(err => {            
            dispatch(purchaseBurgerFail(err));
        });
    }
}
export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}
export const fetchOrderSuccsess = (orders) => {
    return {
        type: actionTypes.FATCH_ORDERS_SUCCSESS,
        orders: orders
    }
}
export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FATCH_ORDERS_FAIL,
        error: error
    }
}
export const fetchOrderStart = () => {
    return {
        type: actionTypes.FATCH_ORDERS_START
    }
}
export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams )
        .then(res => {
            const fetchedOrders = [];
            for(let key in res.data) {
                fetchedOrders.push({id: key ,...res.data[key]});
            }
           dispatch(fetchOrderSuccsess(fetchedOrders))
        }).catch(err => {
            console.log(err);
            dispatch(fetchOrderFail(err))
        })
    };
}