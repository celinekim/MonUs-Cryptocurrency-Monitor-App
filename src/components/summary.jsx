import React from "react";

import * as Currency from '../const/currency';


export class Summary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			assets: JSON.parse(localStorage.getItem('assets')) || Currency.defaultUserAsset,
			currencies: ['BTC', 'ETH'],
		};
		console.log(this.state.assets);
	}

	render() {
		return (
			<table>
				<thead>
				<tr>
					<th>Currency name</th>
					<th>Current Price</th>
					<th>Quantity</th>
					<th>Value</th>
				</tr>
				</thead>

				<tbody>
					{Currency.list.map((symbol) => (
						<tr key={symbol}>
							<td>{symbol}</td>
							<td>{this.props.priceData ? this.props.priceData[symbol].USD : 'N/A'}</td>
							<td>{this.state.assets[symbol] || 0}</td>
							<td>{this.props.priceData ? (this.props.priceData[symbol].USD * (this.state.assets[symbol] || 0)).toPrecision(7) : 'N/A'}</td>
						</tr>
					))}
				</tbody>
			</table>
		)
	}
}