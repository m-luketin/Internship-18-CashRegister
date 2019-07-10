import React, { Component } from 'react';
import Axios from 'axios';
import './style.css';

class SearchItems extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			item: null,
			focused: 0,
			quantitySelector: false
		};
	}

	SearchForItems = () => {
		let search = document.getElementById('search-box').value;
		if (search.length >= 3) {
			Axios.post('api/article/search', { search: search }).then(response => {
				this.setState({ items: response.data });
			});
		}
	};

	AddItem = index => {
		var selection = document.getElementsByClassName('navigation');
		this.setState({
			quantitySelector: true,
			item: selection[index + 1].textContent
		});
	};

	ConfirmItem = () => {
		var quantity = parseInt(document.getElementById('quantity-value').innerHTML, 10);

		this.props.basketHandler(this.state.item, quantity);

		this.setState({ items: [], item: null, quantitySelector: false, focused: 0 }, () => {
			document.getElementById('search-box').value = '';
			document.getElementById('search-box').focus();
		});
	};

	componentDidMount() {
		document.getElementById('search-box').focus();
	}

	componentWillMount() {
		document.addEventListener('keydown', event => {
			var selection = document.getElementsByClassName('navigation');
			var quantity = document.getElementById('quantity-value');
			var confirm = document.getElementById('quantity-confirm');
			switch (event.keyCode) {
				case 38: // arrow up
					if (!this.state.quantitySelector) {
						if (this.state.focused === 0)
							this.setState({ focused: this.state.items.length });
						else if (!this.state.quantitySelector)
							this.setState({ focused: this.state.focused - 1 });
						selection[this.state.focused].focus();
					}
					break;

				case 40: // arrow down
					if (!this.state.quantitySelector) {
						if (this.state.focused === this.state.items.length)
							this.setState({ focused: 0 });
						else if (!this.state.quantitySelector)
							this.setState({ focused: this.state.focused + 1 });
						selection[this.state.focused].focus();
					}
					break;

				case 37: // arrow left
					if (this.state.quantitySelector && parseInt(quantity.innerHTML, 10) > 1) {
						quantity.innerText = (parseInt(quantity.innerHTML, 10) - 1).toString();
						confirm.focus();
					}
					break;

				case 39: // arrow right
					if (this.state.quantitySelector) {
						quantity.innerText = (parseInt(quantity.innerHTML, 10) + 1).toString();
						confirm.focus();
					}
					break;
				case 13:
					if (this.state.quantitySelector) {
						let quantityConfirm = document.getElementById('quantity-confirm');
						quantityConfirm.focus();
					}
					break;

				default:
					break;
			}
		});
	}

	render() {
		return this.state.quantitySelector ? (
			<div className='quantity'>
				<span className='quantity-title'>Quantity:</span>
				<span>◀ </span>
				<span id='quantity-value' className='quantity-value'>
					1
				</span>
				<span> ▶</span>
				<button
					id='quantity-confirm'
					className='quantity-confirm'
					onClick={() => this.ConfirmItem()}>
					Confirm
				</button>
			</div>
		) : (
			<div className='search'>
				<span className='search-title'>Search</span>
				<input
					type='text'
					className='search-box navigation'
					id='search-box'
					autoComplete='off'
					onKeyUp={() => this.SearchForItems()}
				/>
				<div className='search-list'>
					{this.state.items.map((value, key) => {
						return (
							<div className='search-item'>
								<button
									className='navigation'
									index={key}
									onClick={() => this.AddItem(key)}>
									{value.Name}
								</button>
								<span>{value.Price}$</span>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default SearchItems;
