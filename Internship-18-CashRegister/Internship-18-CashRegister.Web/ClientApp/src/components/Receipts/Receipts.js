import React, { Component } from 'react';
import Axios from 'axios';
import Navbar from '../Navbar/Navbar';

import './style.css';

class Receipts extends Component {
	constructor(props) {
		super(props);

		this.state = {
			receipts: [],
			receiptItems: [],
			itemQuantities: [],
			totals: [],
			subtotals: [],
			reducedTaxSums: [],
			normalTaxSums: []
		};
	}

	CalculateSums = () => {
		this.setState({
			totals: [],
			subtotals: [],
			reducedTaxSums: [],
			normalTaxSums: []
		});
		this.state.receiptItems.forEach(receipt => {
			let total = 0,
				subtotal = 0,
				reducedTaxSum = 0,
				normalTaxSum = 0;

			receipt.forEach((receiptItem, key) => {
				console.log(receiptItem.price);
				if (receiptItem.isTaxRateReduced) {
					reducedTaxSum += receiptItem.price * 0.05;
				} else {
					normalTaxSum += receiptItem.price * 0.25;
				}
				total += receiptItem.price;
			});
			console.log(total);
			this.setState({
				totals: [...this.state.totals, total],
				subtotals: [...this.state.subtotals, subtotal],
				reducedTaxSums: [...this.state.reducedTaxSums, reducedTaxSum],
				normalTaxSums: [...this.state.normalTaxSums, normalTaxSum]
			});
		});
	};

	GetReceipts = () => {
		Axios.get('api/receipt/all').then(firstResponse => {
			this.setState({ receipts: firstResponse.data });
			firstResponse.data.map((receipt, key) => {
				Axios.get(`api/articlereceipt/${receipt.ReceiptId}`).then(secondResponse => {
					let receiptArticles = [];
					let quantities = [];
					secondResponse.data.map((articleQuantity, key) => {
						quantities.push(articleQuantity.item2);
						Axios.get(`api/article/${articleQuantity.item1}`).then(thirdResponse => {
							receiptArticles.push(thirdResponse.data);
						});
					});
					this.setState(
						{
							receiptItems: [...this.state.receiptItems, receiptArticles],
							itemQuantities: [...this.state.itemQuantities, quantities]
						},
						this.CalculateSums()
					);
				});
			});
		});
	};

	componentWillMount = () => {
		this.GetReceipts();
	};

	render() {
		return (
			<div className='receipt-list'>
                <Navbar />
				<span className='receipt-list-title'>Receipts</span>
				<div className="entry-container">
					{this.state.receipts.map((item, key) => {
						return (
							<div className='receipt-entry'>
								<div className='list-item'>
									<span>Time:</span>
									<span> {item.TimeStamp}</span>
								</div>
								<div className='list-item'>
									<span>ID:</span>
									<span> {item.SerialNumber}</span>
								</div>
								<div className='list-item'>
									<span>Cashier:</span>
									<span> {item.Employee.Name}</span>
								</div>
								<div className='list-item'>
									<span>Cash register:</span>
									<span> {item.Register.CashRegisterId}</span>
								</div>
								<div className='list-item'>
									<span>Subtotal:</span>
									<span> {this.state.subtotals[key]}</span>
								</div>
								<div className='list-item'>
									<span>Reduced tax total:</span>
									<span> {this.state.reducedTaxSums[key]}</span>
								</div>
								<div className='list-item'>
									<span>Normal tax total:</span>
									<span> {this.state.normalTaxSums[key]}</span>
								</div>
								<div className='list-item'>
									<span>Total:</span>
									<span> {this.state.totals[key]}</span>
								</div>
								<div className='list-item'>
									{this.state.receiptItems.map(item => {
										item.map(article => {
											<div className='item-article'>{article.Name}</div>;
										});
									})}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Receipts;
