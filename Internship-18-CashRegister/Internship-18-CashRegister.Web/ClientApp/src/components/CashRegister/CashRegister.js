import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import SearchItems from './SearchItems/SearchItems';
import BasketItems from './BasketItems/BasketItems';
import Axios from 'axios';
import Navbar from '../Navbar/Navbar';
import './style.css';

class CashRegister extends Component {
	basketHandler = (newItemName, newQuantity) => {
		let newArticle = {},
			newSubtotal = 0.0,
			newTotal = 0.0;
		Axios.post('api/article/get-by-name', { name: newItemName })
			.then(Response => {
				newArticle = Response.data;
			})
			.then(() => {
				for (let i = 0; i < this.props.basket.length; i++) {
					if (this.props.basket[i].isTaxRateReduced) {
						newSubtotal += this.props.basket[i].price * 0.95 * this.props.quantity[i];
					} else if (!this.props.basket[i].isTaxRateReduced) {
						newSubtotal += this.props.basket[i].price * 0.75 * this.props.quantity[i];
					}
					newTotal += this.props.basket[i].price * this.props.quantity[i];
				}

				if (newArticle.isTaxRateReduced) {
					newSubtotal += newArticle.price * 0.95 * newQuantity;
				} else if (!newArticle.isTaxRateReduced) {
					newSubtotal += newArticle.price * 0.75 * newQuantity;
				}
				newTotal += newArticle.price * newQuantity;

				this.props.cashRegisterHandler(newArticle, newQuantity, newSubtotal, newTotal);
			});
	};

	componentWillMount() {
		document.addEventListener('keydown', event => {
			switch (event.keyCode) {
				case 16: // Shift key
					document.getElementById("go-to-checkout").click();
				default:
					break;
			}
		});
    }

	render() {
		return (
			<div className='cash-register' id='cash-register'>
				<Navbar />
				<span className='register-title'>Cash Register No. {this.props.cashRegister}</span>
				<div className='register-components'>
					<SearchItems basketHandler={this.basketHandler} isBasket={true} />
					<BasketItems
						checkout={false}
						basket={this.props.basket}
						quantity={this.props.quantity}
						subtotal={this.props.subtotal}
						total={this.props.total}
					/>
				</div>
				<div className='register-prices'>
					<span className='register-subtotal'>Before tax: {this.props.subtotal}</span>
					<span className='register-total'>Total: {this.props.total}</span>
				</div>
			</div>
		);
	}
}

export default CashRegister;
