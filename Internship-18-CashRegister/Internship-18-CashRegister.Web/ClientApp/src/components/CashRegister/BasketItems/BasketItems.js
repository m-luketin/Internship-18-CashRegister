import React from 'react';
import './style.css';

const BasketItems = props => {
	return (
		<div className={props.checkout ? 'checkout-basket' : 'basket'}>
			<span className={props.checkout ? 'checkout-basket-title' : 'basket-title'}>Basket</span>
			<div className={props.checkout ? 'checkout-basket-columns' : 'basket-columns'}>
				<span className={props.checkout ? 'checkout-column-name' : 'column-name'}>Item</span>
				<span className={props.checkout ? 'checkout-column-name' : 'column-name'}>Price</span>
				<span className={props.checkout ? 'checkout-column-name' : 'column-name'}>Quantity</span>
				{props.checkout ? (
					<React.Fragment>
						<span className='checkout-column-name'>Barcode</span>
						<span className='checkout-column-name'>Tax Rate</span>
					</React.Fragment>
				) : (
					''
				)}
			</div>
			{props.basket.map((item, key) => {
				return (
					<div className={props.checkout ? 'checkout-basket-item' : 'basket-item'} index={key}>
						<span className={props.checkout ? 'checkout-item-column' : 'item-column'}>{item.name}</span> 
						<span className={props.checkout ? 'checkout-item-column' : 'item-column'}>{item.price}</span> 
						<span className={props.checkout ? 'checkout-item-column' : 'item-column'}>{props.quantity[key]}</span>
						{props.checkout ? (
					<React.Fragment>
						<span className='checkout-item-column'>{item.barcode}</span>
						<span  className='checkout-item-column'>{item.isTaxRateReduced ? "5%" : "25%"}</span>
					</React.Fragment>
				) : (
					''
				)}
					</div>
				);
			})}
		</div>
	);
};

export default BasketItems;
