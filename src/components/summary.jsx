import React from "react";
import { toast } from 'materialize-css';

import * as Currency from '../const/currency';
import Request from "request";


export class Summary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			assets: {USD: 0},
			currencies: ['BTC', 'ETH'],
		};
	}

	componentWillReceiveProps(nextProps) {
		this.props = nextProps;
		this.updateWallet();
	}

	updateWallet = () => {
		if (localStorage.getItem('_id')) {
			Request.post({
				url: "http://localhost:8000/wallet",
				json: {
					_id: localStorage.getItem('_id'),
					sessionToken: localStorage.getItem('sessionToken')
				}
			}, (err, res, body) => {
				if (err) {
					console.error(err);
				} else {
					if (res.statusCode === 200) {
						this.setState({assets: body});
					}
				}
			});
		} else {
			this.setState({assets: {USD: 0}});
		}
	};

	transaction = (symbol, amount) => {
		Request.post({
			url: "http://localhost:8000/transaction",
			json: {
				credentials: {
					_id: localStorage.getItem('_id'),
					sessionToken: localStorage.getItem('sessionToken')
				},
				symbol: symbol,
				amount: amount
			}
		}, (err, res, body) => {
			if (err) {
				console.error(err);
			} else {
				if (res.statusCode === 409) {
					if (amount < 0) {
						toast(`Not sufficient ${symbol}!`, 3000);
					} else {
						toast(`Not sufficient USD!`, 3000);
					}
				} else if (res.statusCode === 200) {
					toast(`${amount < 0 ? 'Sold' : 'Bought'} ${body.amount} ${symbol}`, 3000);
					this.setState({assets: body.wallet});
				}
			}
		});
	};

	render() {
		return (
			<table className="highlight responsive-table">
				<thead>
				<tr>
					<th>Currency</th>
					<th>Price</th>
					<th>Quantity</th>
					<th>Value</th>
					<th><span className="hide-on-large-only">Trading</span><span className="hide-on-med-and-down">You have: ${this.state.assets.USD.toPrecision(7)}</span></th>
				</tr>
				<p className="hide-on-large-only">You have:<br/>${this.state.assets.USD.toPrecision(7)}</p>
				</thead>

				<tbody>
					{Currency.list.map((symbol) => (
						<tr key={symbol}>
							<td>{symbol}</td>
							<td>{this.props.priceData ? this.props.priceData[symbol].USD : 'N/A'}</td>
							<td>{(this.state.assets[symbol] || 0).toPrecision(7)}</td>
							<td>{this.props.priceData ? (this.props.priceData[symbol].USD * (this.state.assets[symbol] || 0)).toPrecision(7) : 'N/A'}</td>
							<td className="flex-row">
								<input ref={symbol} type="number" defaultValue={0}/>
								<button className="waves-effect waves-teal btn-flat" onClick={() => {
									if (parseFloat(this.refs[symbol].value) > 0) {
										this.transaction(symbol, parseFloat(this.refs[symbol].value));
									}
								}}>Buy</button>
								<button className="waves-effect waves-teal btn-flat"  onClick={() => {
									if (parseFloat(this.refs[symbol].value) > 0) {
										this.transaction(symbol, -parseFloat(this.refs[symbol].value));
									}
								}}>Sell</button>
								<button className="waves-effect waves-teal btn-flat hide-on-small-only" onClick={() => {
									if (this.state.assets.USD > 0) {
										this.transaction(symbol, 'MAX');
									}
								}}>Buy All</button>
								<button className="waves-effect waves-teal btn-flat hide-on-small-only" onClick={() => {
									let amount = this.state.assets[symbol];
									if (amount > 0) {
										this.transaction(symbol, -amount);
									}
								}}>Sell All</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		)
	}
}