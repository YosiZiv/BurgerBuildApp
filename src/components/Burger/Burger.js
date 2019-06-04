import React from 'react';
import {withRouter} from 'react-router-dom';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients) // take key of object and...
    .map(igKey => { // transform all key TO arrays  
        return [...Array(props.ingredients[igKey])] //  return array number size depend on original object value [ [SIZE],[SIZE], ...ETC ]
        .map((_, i) => { // TRANSFORM UNDFINE PUSH TO ARRAY OBJECTS REACT  ELEMENT 
           return <BurgerIngredient key={igKey + i} type={igKey} /> // transform last to BURGETINGREDEONTS COMPONENTS and set props
        })
    })
    .reduce((arr, el) => { // LOOP AND ADD TO NEW ARRAY OLD ARRAY OBJECTS REACT ELEMNT  
        return arr.concat(el)
    }, []); 
    if (transformedIngredients.length ===  0) {
        transformedIngredients = <p>Please start Add ingredients!</p>
    }

    
    return (
        <div className={classes.Burger}>
        <BurgerIngredient type="bread-top" />
        {transformedIngredients}
        <BurgerIngredient type="bread-bottom" />
        </div>
    );
};
export default withRouter(burger);