import React from 'react';
import Navbar from '../Navbar/Navbar';
import BasketItems from '../CashRegister/BasketItems/BasketItems';
import './style.css';

const Checkout = props => {
	return (
		<div className="checkout-container">
			<Navbar />
			<div className='checkout'>
				<BasketItems
					checkout={true}
					basket={props.basket}
					quantity={props.quantity}
					subtotal={props.subtotal}
					total={props.total}
				/>
			</div>
		</div>
	);
};

export default Checkout;
