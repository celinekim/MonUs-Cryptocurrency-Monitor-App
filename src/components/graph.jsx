import React from "react";
import Chart from "chart.js";
import $ from "jquery";
import Request from 'request';

export class Graph extends React.Component {

	componentWillReceiveProps(nextProps) {
		this.props = nextProps;
		this.loadData(this.chart);
	}

	updateData(chart) {
		chart.data.labels.push(Date.now());
		let option = {
			'url': 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD',
			'json': true
		};
		Request.get(option, (error, response, body) => {
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
			'url': `https://min-api.cryptocompare.com/data/histo${this.props.unit}?fsym=${currency}&tsym=${this.props.currency || 'USD'}&limit=${this.props.limit | 10}&toTs=${tNow}`,
			'json': true
		};
		Request.get(option, (error, response, body) => {
			if (error) {
				console.log(error);
			} else {
				if (body.Type < 100) {
					this.loadCurrencyData(chart, currency, tNow);
				} else {
					let labels = [], datapoints = [];
					// Add field symbol into data for identification
					body.Data.forEach(function (entry) {
						labels.push(entry.time * 1000);
						datapoints.push(entry.close);
					});
					chart.data.datasets.forEach((dataset) => {
						if (dataset.label === currency) {
							dataset.data = datapoints;
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
		this.chart = new Chart(graph, {
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
					text: '(updates every 30s)',
					position: 'bottom',
					fontColor: '#aaa'
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
								labelString: 'USD/BTC',
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
								labelString: 'USD/ETH',
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
		this.loadData(this.chart);
		setInterval(() => {
			this.updateData(this.chart);
		}, 30000);
	}

	render() {
		return <canvas id="sampleGraph"></canvas>
	}
}
