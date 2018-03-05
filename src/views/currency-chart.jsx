import React from 'react';
import { Graph } from '../components/graph';
import $ from 'jquery';
import { SampleSummary } from '../components/sample-summary';


export class CurrencyChart extends React.Component {
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

	render() {
		return (
			<div id="main-graph" className="container-wrapper color-container-wrapper">
				<div className="graph-title">
					<h1>Past</h1>
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
				<div className="graph-title secondary">
					<select id="select-currency1" onChange={this.changeCurrency1} value={this.state.currency1}>
						<option value="BTC">BTC</option>
						<option value="ETH">ETH</option>
						<option value="LTC">LTC</option>
						<option value="XRP">XRP</option>
						<option value="BCH">BCH</option>
						<option value="EOS">EOS</option>
						<option value="XEM">XEM</option>
						<option value="NEO">NEO</option>
						<option value="XLM">XLM</option>
						<option value="ADA">ADA</option>
					</select>
					<select id="select-currency2" onChange={this.changeCurrency2} value={this.state.currency2}>
						<option value="BTC">BTC</option>
						<option value="ETH">ETH</option>
						<option value="LTC">LTC</option>
						<option value="XRP">XRP</option>
						<option value="BCH">BCH</option>
						<option value="EOS">EOS</option>
						<option value="XEM">XEM</option>
						<option value="NEO">NEO</option>
						<option value="XLM">XLM</option>
						<option value="ADA">ADA</option>
					</select>
				</div>

				<div className='chart-container'>
					<Graph unit={this.state.unit} limit={this.state.limit} currency={[this.state.currency1, this.state.currency2]} />
				</div>{/*<SampleSummary />*/}
			</div>
		)
	}
}
