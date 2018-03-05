import React from 'react';
import $ from 'jquery';

import { Graph } from '../components/graph';
import { Summary } from '../components/summary';
import * as Currency from '../const/currency';


export class CurrencyView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {unit: localStorage.getItem('unit') || 'day',
				limit: localStorage.getItem('limit') || 30,
				currency1: localStorage.getItem('currency1') || 'BTC',
				currency2: localStorage.getItem('currency2') || 'ETH'};
	}

	componentDidMount() {
		$('select').material_select();
		$('#select-limit').on('change', this.changeLimit);
		$('#select-unit').on('change', this.changeUnit);
		$('#select-currency1').on('change', this.changeCurrency1);
		$('#select-currency2').on('change', this.changeCurrency2);
	}

	changeLimit = (event) => {
		this.setState({limit: event.target.value});
		localStorage.setItem('limit', event.target.value);
	};

	changeUnit = (event) => {
		this.setState({unit: event.target.value});
		localStorage.setItem('unit', event.target.value);
	};

	changeCurrency1 = (event) => {
		this.setState({currency1: event.target.value});
		localStorage.setItem('currency1', event.target.value);
	};

	changeCurrency2 = (event) => {
		this.setState({currency2: event.target.value});
		localStorage.setItem('currency2', event.target.value);
	};

	priceUpdate = (data) => {
		this.setState({priceData: data});
	};

	render() {
		return (
			<div id="main-graph" className="container-wrapper color-container-wrapper">
				<div className="graph-title">
					<p>Past</p>
					<select className="select-limit" id="select-limit" onChange={this.changeLimit} value={this.state.limit}>
						<option value="15">15</option>
						<option value="30">30</option>
						<option value="60">60</option>
						<option value="120">120</option>
					</select>
					<select className="select-unit" id="select-unit" onChange={this.changeUnit} value={this.state.unit}>
						<option value="minute">Minutes</option>
						<option value="hour">Hours</option>
						<option value="day">Days</option>
					</select>
				</div>
				

				<div className='chart-container'>
					<Graph unit={this.state.unit} limit={this.state.limit} currency={[this.state.currency1, this.state.currency2]} update={this.priceUpdate}/>
				</div>
				<div className="graph-title secondary">
					<select id="select-currency1" onChange={this.changeCurrency1} value={this.state.currency1}>
						{Currency.list.map((symbol) => (
							<option key={symbol} value={symbol}>{symbol}</option>
						))}
					</select>
					<select id="select-currency2" onChange={this.changeCurrency2} value={this.state.currency2}>
						{Currency.list.map((symbol) => (
							<option key={symbol} value={symbol}>{symbol}</option>
						))}
					</select>
				</div>
				<Summary priceData={this.state.priceData}/>
			</div>
		)
	}
}
