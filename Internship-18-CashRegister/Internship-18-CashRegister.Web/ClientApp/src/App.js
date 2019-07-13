import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import Login from './components/Login/Login';
import CashRegister from './components/CashRegister/CashRegister';
import Checkout from './components/Checkout/Checkout';
import Delivery from './components/Delivery/Delivery';
import Receipts from './components/Receipts/Receipts';

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cashRegister: 0,
			cashier: '',
			basket: [],
			quantity: [],
			subtotal: 0,
			total: 0
		};
	}

	loginHandler = (cashRegister, cashier) => {
		this.setState({
			cashRegister: cashRegister,
			cashier: cashier
		});
	};

	cashRegisterHandler = (newBasketItem, newQuantity, newSubtotal, newTotal) => {
		this.setState({
			basket: [...this.state.basket, newBasketItem],
			quantity: [...this.state.quantity, newQuantity],
			subtotal: newSubtotal,
			total: newTotal
		});
	};

	render() {
		return (
			<Switch>
				<Route exact path='/' render={() => <Login loginHandler={this.loginHandler} />} />
				<Route
					exact
					path='/cashregister'
					render={() => (
						<CashRegister
							cashRegister={this.state.cashRegister}
							basket={this.state.basket}
							quantity={this.state.quantity}
							subtotal={this.state.subtotal}
							total={this.state.total}
							cashRegisterHandler={this.cashRegisterHandler}
						/>
					)}
				/>
				<Route
					exact
					path='/checkout'
					render={() => (
						<Checkout
							basket={this.state.basket}
							quantity={this.state.quantity}
							subtotal={this.state.subtotal}
							total={this.state.total}
							cashier={this.state.cashier}
							cashRegister={this.state.cashRegister}
						/>
					)}
				/>
				<Route exact path='/delivery' render={() => <Delivery />} />
				 <Route exact path='/receipts' render={() => <Receipts />} />  
			</Switch>
		);
	}
}
