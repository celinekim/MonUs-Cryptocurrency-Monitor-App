import React from 'react';
import Request from 'request';
import $ from 'jquery';
import Chart from 'chart.js';

function addData(chart) {
	chart.data.labels.push(new Date());
	let option = {
		'url': 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD',
		'json': true
	};
	Request.get(option, function(error, response, body) {
		if (error) {
			console.log(error);
		} else {
			console.log(body);
			chart.data.datasets.forEach((dataset) => {
				dataset.data.push(body[dataset.label].USD);
			});
			chart.update();
		}
	});

}

export class Home extends React.Component {
	componentDidMount() {
		let graph = $("#sampleGraph");
		let chart = new Chart(graph, {
			type: 'line',
			data: {
				label: [],
				datasets: [
					{
						data: [],
						yAxisID: 'BTC',
						label: "BTC",
						borderColor: "rgb(247, 147, 26)",
						fill: false
					},
					{
						data: [],
						yAxisID: 'ETH',
						label: "ETH",
						borderColor: "rgb(3, 169, 244)",
						fill: false
					}
				]
			},
			options: {
				title: {
					display: true,
					text: 'USD to Cryptocurrency'
				},
				scales: {
					xAxes: [
						{
							type: 'time',
							time: {
								displayFormats: {
									'second': 'h:mm:ss a'
								}
							}
						}
					],
					yAxes: [
						{
							id: 'BTC',
							scaleLabel: {
								labelString: '$/BTC',
								display: true,
								fontColor: "rgb(247, 147, 26)"
							},
							type: 'linear',
							position: 'left',
							ticks: {
								fontColor: "rgba(247, 147, 26, 0.5)"
							}
						},
						{
							id: 'ETH',
							scaleLabel: {
								labelString: '$/ETH',
								display: true,
								fontColor: "rgb(3, 169, 244)"
							},
							type: 'linear',
							position: 'right',
							ticks: {
								fontColor: "rgba(3, 169, 244, 0.5)"
							}
						}
					]
				},
				responsive: true,
				maintainAspectRatio: false
			}
		});
		addData(chart);
		setInterval(function () {
			addData(chart);
		}, 10000);
	}

	render() {
		return (
			<div id="home" class="container-wrapper color-container-wrapper">
				<h1>MonUs</h1>
				<h2 class="no-margin">Your cryptocurrency monitor</h2>
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
