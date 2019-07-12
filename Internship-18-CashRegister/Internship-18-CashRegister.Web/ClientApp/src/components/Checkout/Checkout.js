import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import BasketItems from '../CashRegister/BasketItems/BasketItems';
import './style.css';
import Axios from 'axios';

class Checkout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			time: '',
			id: '',
			reducedTax: 0,
			normalTax: 0,
			hasReceipt: false
		};
	}

	CalculateSpecialSums = () => {
		let reducedSum = 0,
			normalSum = 0,
			reducedCount = 0,
			normalCount = 0;

		this.props.basket.forEach(basketItem => {
			if (basketItem.isTaxRateReduced) {
				reducedSum += basketItem.price * 0.05;
				reducedCount++;
			} else {
				normalSum += basketItem.price * 0.25;
				normalCount++;
			}
		});

		if (reducedCount) this.setState({ reducedTax: reducedSum / reducedCount });
		if (normalCount) this.setState({ normalTax: normalSum / normalCount });
	};

	GetReceipt = () => {
		this.CalculateSpecialSums();
		let employee = '';

		Axios.get(`api/employee/username/${this.props.cashier}`)
			.then(response => {
				employee = response.data;
			})
			.then(() => {
				Axios.post('api/receipt/add', {
					employee: employee,
					register: this.props.cashRegister
				}).then(response => {
					this.props.basket.map((item, key) => {
						console.log(item.articleId);
						Axios.post("api/articlereceipt/add", {receiptId: response.data, articleId: item.articleId, quantity: this.props.quantity[key]});
					})
				});
			});

		this.setState({ hasReceipt: true });
	};

	render() {
		return (
			<div className='checkout-container'>
				<Navbar />
				<div className='checkout'>
					<BasketItems
						checkout={true}
						basket={this.props.basket}
						quantity={this.props.quantity}
					/>
				</div>
				<div className='checkout-receipt'>
					<span className='receipt-title'>Checkout</span>
					<button onClick={() => this.GetReceipt()}>Get Receipt</button>
					{this.state.hasReceipt ? (
						<div className='receipt-details'>
							<span>Time: {this.state.time}</span>
							<span>ID: {this.state.id}</span>
							<span>Cashier: {this.props.cashier}</span>
							<span>Cash register: {this.props.cashRegister}</span>
							<span>Subtotal: {this.props.subtotal}</span>
							<span>Reduced tax total: {this.state.reducedTax}</span>
							<span>Normal tax total: {this.state.normalTax}</span>
							<span>Total: {this.props.total}</span>
						</div>
					) : (
						''
					)}
				</div>
			</div>
		);
	}
}

export default Checkout;
