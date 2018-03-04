import React from 'react';
import $ from 'jquery';
import Chart from 'chart.js';

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function addData(chart, label) {
	chart.data.labels.push(new Date());
	chart.data.datasets.forEach((dataset) => {
	    dataset.data.push(getRandomInt(10));
	});
	chart.update();
}

export class Home extends React.Component {
	render() {
		var start = 0
		$(document).ready(function() {
			var graph =  $("#sampleGraph")
			var chart = new Chart(graph, {
				type: 'line',
				data: {
					label: new Date(),
					datasets: [{ 
						data: [getRandomInt(10)],
						label: "BTC",
						borderColor: "#f7931a",
						fill: false
						}, { 
					data: [getRandomInt(10)],
						label: "ETH",
						borderColor: "#90A4AE",
						fill: false
					}, { 
						data: [getRandomInt(10)],
						label: "LTC",
						borderColor: "#03A9F4",
						fill: false
					}]
				},
				options: {
					title: {
						display: true,
						text: 'USD to Cryptocurrency'
					},
					scales: {
						xAxes: [{
							type: 'time',
							time: {
								displayFormats: {
									'second': 'HH:MM:ss'
								}
							}
						}]
					},
					responsive: true,
					maintainAspectRatio: false
				}
			})
			setInterval(function() {
				addData(chart)
			}, 5000)
		})
		return (
			<div id="home" class="container-wrapper color-container-wrapper">
				<h1 class="drop-shadow">MonUs</h1>
				<h2 class="drop-shadow no-margin">Your cryptocurrency monitor</h2>
				<div class='chart-container row'>
					<canvas id="sampleGraph"></canvas>
				</div>
				<div class="row">
					<h3>Monitor Your Cryptocurrency!</h3>
					<p class="text-content">MonUs is your one-stop shop to get the latest on your favourite cryptocurrencies. We monitor the prices of the top ten currencies:
					<ul class="currency-list">
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
					We incorporate real-time graphs that display current and historical data for cryptocurrencies. You can create an account to follow your favourite cryptocurrencies and perform mock trading, in which you will receive $5000 USD once you create an account. Each graph updates every few seconds.
					</p>
				</div>
			</div>
		)
	}
}
