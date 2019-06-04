import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDEINT,
        ingredientName: name
    };
};
export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDEINT,
        ingredientName: name
    };
};
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDEINTS,
        ingredients: ingredients
    }
}
export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FATCH_INGREDIENTS_FAILED
    }
}
export const initIngredeints = () => {
    return dispatch => {
        axios.get('https://udemy-ng-http-ebb4c.firebaseio.com/ingredients.json')
        .then(respone => {
        dispatch(setIngredients(respone.data));
        })
        .catch(err => {
            console.log(err);
            dispatch(fetchIngredientsFailed());
        });
    }
  
}