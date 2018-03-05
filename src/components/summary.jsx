import React from "react";
import { userAsset } from '../const/currency';

export class Summary extends React.Component {
	constructor(props) {
		super(props);
		// const temp = {};
		// props.dataset.forEach(item => {
		// 	if (item.data && item.data.length > 0) {
		// 		temp[item.label] = item.data.slice(-1)[0];
		// 	}
		// });
		this.state = {
			assets: userAsset,
			currencies: ['BTC', 'ETH'],
		}
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
					{this.state.assets.map((item, i) => (
						<tr key={i}>
							<td>{item.symbol}</td>
							<td>{this.props.priceData ? this.props.priceData[item.symbol].USD : 'N/A'}</td>
							<td>{item.amount}</td>
							<td>{this.props.priceData ? (this.props.priceData[item.symbol].USD * item.amount).toPrecision(7) : 'N/A'}</td>
						</tr>
					))}
				</tbody>
			</table>
		)
	}
}