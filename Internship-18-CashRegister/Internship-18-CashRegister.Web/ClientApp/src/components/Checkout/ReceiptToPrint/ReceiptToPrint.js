import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import '../style.css';

class ReceiptToPrint extends Component {
	render() {
		return (
			<div className='receipt-to-print'>
				<div
					className='checkout-receipt'
					ref={r => {
						this.componentRef = r;
					}}>
					<div className='receipt-header'>
						<span className='receipt-title'>Checkout</span>
						<button id='get-receipt' onClick={() => this.GetReceipt()}>
							Get Receipt
						</button>
					</div>
					<div>
						{this.state.hasReceipt ? (
							<div className='receipt-details'>
								<div className='details-item'>
									<span>Time:</span>
									<span> {this.state.time}</span>
								</div>
								<div className='details-item'>
									<span>ID:</span>
									<span> {this.state.id}</span>
								</div>
								<div className='details-item'>
									<span>Cashier:</span>
									<span> {this.props.cashier}</span>
								</div>
								<div className='details-item'>
									<span>Cash register:</span>
									<span> {this.props.cashRegister}</span>
								</div>
								<div className='details-item'>
									<span>Subtotal:</span>
									<span> {this.props.subtotal}</span>
								</div>
								<div className='details-item'>
									<span>Reduced tax total:</span>
									<span> {this.state.reducedTax}</span>
								</div>
								<div className='details-item'>
									<span>Normal tax total:</span>
									<span> {this.state.normalTax}</span>
								</div>
								<div className='details-item'>
									<span>Total:</span>
									<span> {this.props.total}</span>
								</div>
							</div>
						) : (
							''
						)}
					</div>
				</div>
				<ReactToPrint
					trigger={() => (
						<button>
							Print Receipt
						</button>
					)}
					content={() => this.componentRef}
				/>
			</div>
		);
	}
}

export default ReceiptToPrint;