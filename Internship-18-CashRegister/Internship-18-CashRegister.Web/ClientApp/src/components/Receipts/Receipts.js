import React, { Component } from 'react';
import Axios from 'axios';

class Receipts extends Component {
	constructor(props) {
		super(props);

		this.state = {
			receipts: [],
			receiptItems: [],
			itemQuantities: []
		};
	}

	componentDidMount = () => {
		Axios.get('api/receipt/all').then(firstResponse => {
			console.log(firstResponse.data);
			this.setState({ receipts: firstResponse });
			firstResponse.data.map((receipt, key) => {
				Axios.get(`api/articlereceipt/${receipt.receiptId}`).then(secondResponse => {
					let receiptArticles = [];
					let quantities = [];
					secondResponse.data.map((articleQuantity, key) => {
						quantities.push(articleQuantity.item2);
						Axios.get(`api/article/${articleQuantity.item1}`).then(thirdResponse => {
							receiptArticles.push(thirdResponse.data);
						});
					});
					this.setState({
						receiptItems: [...this.state.receiptItems, receiptArticles],
						itemQuantities: [...this.state.itemQuantities, quantities]
					});
				});
			});
		});
		console.log(this.state);
	};

	render() {
		return (
			<div className='receipt-list'>
				<span className='receipt-list-title'>Receipts</span>
				{this.state.receipts.map(item => {
					return (
						<div>
							<div className='list-item'>
								<span>Time:</span>
								<span> {item.timeStamp}</span>
							</div>
							<div className='list-item'>
								<span>ID:</span>
								<span> {item.serialNumber}</span>
							</div>
							<div className='list-item'>
								<span>Cashier:</span>
								<span> {item.employee}</span>
							</div>
							<div className='list-item'>
								<span>Cash register:</span>
								<span> {item.register}</span>
							</div>
							<div className='list-item'>
								<span>Subtotal:</span>
								<span> {item.subtotal}</span>
							</div>
							<div className='list-item'>
								<span>Reduced tax total:</span>
								<span> {item.reducedTax}</span>
							</div>
							<div className='list-item'>
								<span>Normal tax total:</span>
								<span> {item.normalTax}</span>
							</div>
							<div className='list-item'>
								<span>Total:</span>
								<span> {item.total}</span>
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
		);
	}
}

export default Receipts;
