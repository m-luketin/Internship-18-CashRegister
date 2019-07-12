import React, { Component } from 'react';
import SearchItems from '../CashRegister/SearchItems/SearchItems';
import Axios from 'axios';
import Navbar from '../Navbar/Navbar';
import './style.css';

class Delivery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			quantity: []
		};
    }
    
    componentWillMount() {
		document.addEventListener('keydown', event => {
			switch (event.keyCode) {
                case 17: // Ctrl key
                this.ConfirmDelivery();
				default:
					break;
			}
		});
    }
    
	deliveryHandler = (newItem, newQuantity) => {
		this.setState({
			items: [...this.state.items, newItem],
			quantity: [...this.state.quantity, newQuantity]
		});
	};

	ConfirmDelivery = () => {
        if(!this.state.items.length){
            window.alert("No items!")
            document.getElementById('search-box').focus();
            return;
        }
		Axios.post('api/article/delivery', {
			items: this.state.items,
			quantity: this.state.quantity
		}).then(response => {
            if(response.headers.status == "200")
            {
                window.alert(`Entered:  ${this.state.items} \nQuantities: ${this.state.quantity}`);
                this.setState({items: [], quantity:[]});
            }
            else
                window.alert("Invalid delivery!");
		});
	};

	render() {
		return (
			<div className='delivery-container'>
				<Navbar />
				<div className='delivery'>
					<div className='delivery-search'>
						<SearchItems isBasket={false} deliveryHandler={this.deliveryHandler} />
					</div>
					<div className='delivery-list'>
						<span className='delivery-title'>Delivered</span>
                        <div className="delivery-subtitles">
                        <span>Item name</span>
                        <span> Quantity</span>
                        </div>
                        <div className='delivery-items'>
						{this.state.items.map((item, key) => {
                            return (
                                <div className='delivery-item'>
									<span>{item}</span>
									<span>{this.state.quantity[key]}</span>
								</div>
							);
						})}
                        </div>
						<button
							className='delivery-confirm'
							onClick={() => {
								this.ConfirmDelivery();
							}}>
							Confirm delivery (Ctrl key)
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Delivery;
