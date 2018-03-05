import React from "react";
import Chart from "chart.js";
import $ from "jquery";
import Request from 'request';

export class Graph extends React.Component {

	componentWillReceiveProps(nextProps) {
		this.props = nextProps;
		for (let i in this.props.currency) {
			this.chart.data.datasets[i].label = this.props.currency[i];
		}
		this.loadData(this.chart);
	}

	updateData() {
		if (this.props.unit === 'minute') {
			this.chart.data.labels.push(Date.now());
			let option = {
				'url': `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${this.props.currency.join()}&tsyms=${this.props.targetCurrency || 'USD'}`,
				'json': true
			};
			Request.get(option, (error, response, body) => {
				if (error) {
					console.log(error);
				} else {
					this.chart.data.datasets.forEach((dataset) => {
						dataset.data.push(body[dataset.label].USD);
					});
					this.chart.update();
				}
			});
		}
	}

	loadData() {
		let tNow = Math.floor(Date.now() / 1000);
		this.props.currency.forEach((currency) => {
			this.loadCurrencyData(currency, tNow);
		})
	}

	loadCurrencyData(currency, tNow) {
		let option = {
			'url': `https://min-api.cryptocompare.com/data/histo${this.props.unit}?fsym=${currency}&tsym=${this.props.targetCurrency || 'USD'}&limit=${this.props.limit | 10}&toTs=${tNow}`,
			'json': true
		};
		Request.get(option, (error, response, body) => {
			if (error) {
				console.log(error);
			} else {
				if (body.Type < 100) {
					this.loadCurrencyData(currency, tNow);
				} else {
					let labels = [], datapoints = [];
					// Add field symbol into data for identification
					body.Data.forEach(function (entry) {
						labels.push(entry.time * 1000);
						datapoints.push(entry.close);
					});
					this.chart.data.datasets.forEach((dataset) => {
						if (dataset.label === currency) {
							dataset.data = datapoints;
						}
					});
					this.chart.data.labels = labels;
					this.chart.update();
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
						yAxisID: 'left',
						label: "BTC",
						borderColor: "rgb(247, 147, 26)",
						fill: false
					},
					{
						data: [],
						yAxisID: 'right',
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
						}
					],
					yAxes: [
						{
							id: 'left',
							scaleLabel: {
								labelString: 'USD',
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
							id: 'right',
							scaleLabel: {
								labelString: 'USD',
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
