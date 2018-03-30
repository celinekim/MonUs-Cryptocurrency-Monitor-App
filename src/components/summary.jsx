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

	componentDidMount() {
		Request.post({
			url: "http://localhost:8000/wallet",
			json: {
				userID: localStorage.getItem('_id'),
				sessionToken: localStorage.getItem('token')
			}
		}, (err, res, body) => {
			if (err) {
				console.error(err);
			} else {
				this.setState({assets: body});
			}
		});
	}

	transaction = (symbol, amount) => {
		let assets = this.state.assets;
		let USDAmount = assets.USD - this.props.priceData[symbol].USD * amount;
		let symbolAmount = (assets[symbol] || 0) + amount;
		if (USDAmount >= 0 && symbolAmount >= 0) {
			assets.USD = USDAmount;
			assets[symbol] = symbolAmount;
			this.setState({assets: assets});
			localStorage.setItem('assets', JSON.stringify(assets));
			return true;
		} else {
			return false;
		}
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
								<input ref={symbol} type="number"/>
								<button className="waves-effect waves-teal btn-flat" onClick={() => {
									if (parseFloat(this.refs[symbol].value) > 0) {
										if (this.transaction(symbol, parseFloat(this.refs[symbol].value))) {
											toast(`Bought ${this.refs[symbol].value} ${symbol}`, 3000)
										} else {
											toast(`Not sufficient funds!`, 3000)
										}
									}
								}}>Buy</button>
								<button className="waves-effect waves-teal btn-flat"  onClick={() => {
									if (parseFloat(this.refs[symbol].value) > 0) {
										if (this.transaction(symbol, -parseFloat(this.refs[symbol].value))) {
											toast(`Sold ${this.refs[symbol].value} ${symbol}`, 3000)
										} else {
											toast(`Not sufficient ${symbol}!`, 3000)
										}
									}
								}}>Sell</button>
								<button className="waves-effect waves-teal btn-flat hide-on-small-only" onClick={() => {
									let amount = this.state.assets.USD / this.props.priceData[symbol].USD;
									if (amount > 0) {
										this.transaction(symbol, amount);
										toast(`Bought ${amount} ${symbol}`, 3000)
									}
								}}>Buy All</button>
								<button className="waves-effect waves-teal btn-flat hide-on-small-only" onClick={() => {
									let amount = this.state.assets[symbol];
									if (amount > 0) {
										this.transaction(symbol, -amount);
										toast(`Sold ${amount} ${symbol}`, 3000)
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