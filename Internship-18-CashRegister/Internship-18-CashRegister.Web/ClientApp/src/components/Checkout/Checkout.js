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

	componentDidMount() {
		document.getElementById('get-receipt').focus();

		document.addEventListener('keydown', event => {
			switch (event.keyCode) {
				case 16: // Shift key
					document.getElementById('go-to-delivery').click();
				default:
					break;
			}
		});
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
		if (!this.props.basket.length) {
			window.alert('No items in basket!');
			return;
		}

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
					console.log(response);
					this.props.basket.map((item, key) => {
						Axios.post('api/articlereceipt/add', {
							receiptId: response.data.receiptId,
							articleId: item.articleId,
							quantity: this.props.quantity[key]
						});
						this.setState({ id: response.data.guid, time: response.data.time });
					});
				});
			});

		this.setState({ hasReceipt: true });
	};

	PrintReceipt = () => {
		if(!this.state.hasReceipt)
		{
			window.alert("You need a receipt to print first!");
			return;
		}

		
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
					<div className="receipt-header" >
						<span className='receipt-title'>Checkout</span>
						<button id='get-receipt' onClick={() => this.GetReceipt()}>
							Get Receipt
						</button>
					</div>
					<div>
						{this.state.hasReceipt ? (
							<div className='receipt-details'>
								<div className="details-item"><span>Time:</span><span> {this.state.time}</span></div>
								<div className="details-item"><span>ID:</span><span> {this.state.id}</span></div>
								<div className="details-item"><span>Cashier:</span><span> {this.props.cashier}</span></div>
								<div className="details-item"><span>Cash register:</span><span> {this.props.cashRegister}</span></div>
								<div className="details-item"><span>Subtotal:</span><span> {this.props.subtotal}</span></div>
								<div className="details-item"><span>Reduced tax total:</span><span> {this.state.reducedTax}</span></div>
								<div className="details-item"><span>Normal tax total:</span><span> {this.state.normalTax}</span></div>
								<div className="details-item"><span>Total:</span><span> {this.props.total}</span></div>
							</div>
						) : (
							''
						)}
					</div>
					<button id='print-receipt' onClick={() => this.PrintReceipt()}>
						Print Receipt
					</button>
				</div>
			</div>
		);
	}
}

export default Checkout;
