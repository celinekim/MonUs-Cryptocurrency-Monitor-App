import React from "react";
import Request from 'request';

import * as Const from '../const/currency';
import { Graph } from './graph';
import { SampleSummary } from './sample-summary';

export class DataDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: [],
            dataset: Const.currencies.map((currency) => (
                {
                    data: [],
                    yAxisID: currency.symbol,
                    label: currency.symbol,
                    borderColor: currency.color,
                    fill: false
                }
            )),
            timer: 0,
        };
    }

	updateData() {
        const tempLabels = this.state.labels;
        tempLabels.push(Date.now());
		let option = {
			'url': `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${Const.currencies.map(c => c.symbol).join(',')}&tsyms=USD`,
			'json': true
		};
		Request.get(option, (error, response, body) => {
			if (error) {
				console.log(error);
			} else {
                const tempData = this.state.dataset;

                tempData.forEach((dataset) => {
                    dataset.data.push(body[dataset.label].USD);
                })
                this.setState({ dataset: tempData, labels: tempLabels });
			}
		});
	}

	loadData() {
        let tNow = Math.floor(Date.now() / 1000);
        if (Const.currencies && Const.currencies.length > 0) {
            this.loadCurrencyData(Const.currencies[0], tNow, Const.currencies.slice(1));
        }
	}

	loadCurrencyData(currency, tNow, remaining) {
		let option = {
			'url': `https://min-api.cryptocompare.com/data/histominute?fsym=${currency.symbol}&tsym=USD&limit=10&toTs=${tNow}`,
			'json': true
		};
		Request.get(option, (error, response, body) => {
			if (error) {
				console.log(error);
			} else {
				if (body.Type < 100) {
					this.loadCurrencyData(currency, tNow);
				} else {
                    const tempData = this.state.dataset;
                    const tempLabels = [];

                    tempData.forEach(dataSet => {
                        if (dataSet.label === currency.symbol) {
                            body.Data.forEach((entry) => {
                                tempLabels.push(entry.time * 1000);
                                dataSet.data.push(entry.close);
                            })
                        }
                    });

                    this.setState({ labels: tempLabels, dataset: tempData });

                    if (remaining && remaining.length > 0) {
                        this.loadCurrencyData(remaining[0], tNow, remaining.slice(1));
                    }
				}
			}
		});
	}

	componentDidMount() {
		this.loadData();
		setInterval(() => {
			this.updateData();
		}, 30000);
	}

	render() {
        const { isHome, unit, limit } = this.props;
        const { dataset, labels } = this.state;

        if (isHome) {
            return (
                <div>
                    <div className='chart-container row'>
                        <Graph dataset={dataset} labels={labels} limit={limit} unit={unit} />
                    </div>
                </div>
            );
        }

        return (
            <div>
                <h1>Past {limit} {unit}s</h1>
                <div className='chart-container row'>
                    
                    <Graph dataset={dataset} labels={labels} limit={limit} unit={unit} />
                </div>
                <SampleSummary dataset={dataset} labels={labels} />
            </div>
        );
	}
}