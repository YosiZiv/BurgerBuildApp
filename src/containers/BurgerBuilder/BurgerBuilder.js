import React, { Component } from 'react';
import {connect} from 'react-redux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index'
import axios from '../../axios-orders';
class BurgerBuilder extends Component {
    
    state = {
        purchasing: false // DISABLE ORDER BUTTON UNTIL HAVE INGREDIENTS ORDERS
    }
    componentDidMount () {
        this.props.onInitIngredient();
    }
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum + el;
        }, 0 );
        return sum > 0
    }


    purchaseHandler = () =>  {
        if(this.props.isAuthenticated) {
            this.setState({purchasing: true})
        } else {
            this.props.onSetAuthRedirectPath('/checkout')  
            this.props.history.push('/auth');
        }
    }

    purchaseCanselHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disableInfo = {
            ...this.props.ings
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients cant be loaded</p>: <Spinner />;
        if(this.props.ings) {
        burger =  (
        <React.Fragment>
          <Burger ingredients={this.props.ings} />
              <BuildControls 
                 ingredientAdded= {this.props.onIngredientAdded} 
                  ingredientRemoved={this.props.onIngredientRemove}
                  disabled = {disableInfo}
                  price={this.props.price}
                  isAuth= {this.props.isAuthenticated}
                 purchaseable={this.updatePurchaseState(this.props.ings)}
                  ordered= {this.purchaseHandler}
        />
             </React.Fragment>
        ); 

        orderSummary =  (
          <OrderSummary
              price= {this.props.price}
             purchaseCancelled={this.purchaseCanselHandler} 
             purchaseContinued={this.purchaseContinueHandler}  
             ingredients={this.props.ings}/>
        );
    }
        return (
            <React.Fragment>
                <Modal modalClosed={this.purchaseCanselHandler}
                show={this.state.purchasing}>
                   {orderSummary}
                </Modal>
                {burger}
                </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemove: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredient: () => dispatch(actions.initIngredeints()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));