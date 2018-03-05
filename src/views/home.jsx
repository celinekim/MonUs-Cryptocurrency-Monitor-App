import React from 'react';

import { Graph } from '../components/graph';


export class HomeView extends React.Component {
	render() {
		return (
			<div id="home" className="container-wrapper color-container-wrapper">
				<h1>MonUs</h1>
				<h2 className="no-margin text-shadow">Your cryptocurrency monitor</h2>

				<div className='chart-container row'>
					<Graph limit={10} unit='minute' currency={['BTC', 'ETH']} title="(Updates every 30s)" />
				</div>

				<div className="row">
					<h3 className="text-shadow">Monitor Your Cryptocurrency!</h3>
					<p className="text-content">MonUs is your one-stop shop to get the latest on your favourite cryptocurrencies. We monitor the prices of the top ten currencies:</p>
					<ul className="currency-list">
						<li>Bitcoin (BTC)</li>
						<li>Ethereum (ETH)</li>
						<li>Ripple (XRP)</li>
						<li>Bitcoin Cash (BCH)</li>
						<li>Cardano (ADA)</li>
						<li>Stellar (XLM)</li>
						<li>NEO (NEO)</li>
						<li>Litecoin (LTC)</li>
						<li>EOS (EOS)</li>
						<li>NEM (XEM)</li>
					</ul>
					<p className="text-content">
					We incorporate real-time graphs that display current and historical data for cryptocurrencies. You can create an account to follow your favourite cryptocurrencies and perform mock trading, in which you will receive $5000 USD once you create an account. 
					</p>
				</div>
			</div>
		)
	}
}
