import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility'
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}
const addIngredient = (state, action) => {
    const updateIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updateIngredients = updateObject(state.ingredients, updateIngredient);
    const updatedState = {
        ingredients: updateIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState)
}

const removeIngredient = (state, action) => {
    const updateIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updateIngs = updateObject(state.ingredients, updateIng);
    const updatedSt = {
        ingredients: updateIngs,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedSt)
}
const setIngredients = (state, action) => {
    return updateObject(state, {
    ingredients: {
        salad: action.ingredients.salad,
        bacon: action.ingredients.bacon,
        cheese: action.ingredients.cheese,
        meat: action.ingredients.meat
    },
    totalPrice: 4,
    error: false,
    building: false
});
}
const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {error: true})
}
const reducer = (state = initialState , action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDEINT:  return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDEINT:  return removeIngredient(state, action);
        case actionTypes.SET_INGREDEINTS: return setIngredients(state, action)
        case actionTypes.FATCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action)
        default:
        return state;
    }
}

export default reducer;