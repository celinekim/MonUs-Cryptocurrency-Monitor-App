import React from "react";
import Chart from "chart.js";
import $ from "jquery";
import Request from 'request';

export class SampleGraph extends React.Component {
	updateData(chart) {
		chart.data.labels.push(Date.now());
		let option = {
			'url': 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD',
			'json': true
		};
		Request.get(option, function(error, response, body) {
			if (error) {
				console.log(error);
			} else {
				chart.data.datasets.forEach((dataset) => {
					dataset.data.push(body[dataset.label].USD);
				});
				chart.update();
			}
		});
	}

	loadData(chart) {
		let tNow = Math.floor(Date.now() / 1000);
		['BTC', 'ETH'].forEach((currency) => {
			this.loadCurrencyData(chart, currency, tNow);
		})
	}

	loadCurrencyData(chart, currency, tNow) {
		let option = {
			'url': `https://min-api.cryptocompare.com/data/histominute?fsym=${currency}&tsym=USD&limit=10&toTs=${tNow}`,
			'json': true
		};
		Request.get(option, (error, response, body) => {
			if (error) {
				console.log(error);
			} else {
				if (body.Type < 100) {
					this.loadCurrencyData(chart, currency, tNow);
				} else {
					let labels = [];
					// Add field symbol into data for identification
					chart.data.datasets.forEach((dataset) => {
						if (dataset.label === currency) {
							body.Data.forEach(function (entry) {
								labels.push(entry.time * 1000);
								dataset.data.push(entry.close);
							});
						}
					});
					chart.data.labels = labels;
					chart.update();
				}
			}
		});
	}

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
					text: 'Live USD to Cryptocurrency (Updates every 30s)'
				},
				scales: {
					xAxes: [
						{
							type: 'time',
							time: {
								unit: 'minute',
								displayFormats: {
									'minute': 'h:mm a'
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
		this.loadData(chart);
		setInterval(() => {
			this.updateData(chart);
		}, 30000);
	}

	render() {
		return <canvas id="sampleGraph"></canvas>
	}
}