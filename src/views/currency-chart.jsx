import React from 'react';
import { Graph } from '../components/graph';
import $ from 'jquery';
import { SampleSummary } from '../components/sample-summary';


export class CurrencyChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {unit: localStorage.getItem('unit') || 'day',
				limit: localStorage.getItem('limit') || 30,
				currency1: 'BTC',
				currency2: 'ETH'};
	}

	componentDidMount() {
		$('select').material_select();
		$('#select-limit').on('change', this.changeLimit);
		$('#select-unit').on('change', this.changeUnit);
		setTimeout(() => {
			this.setState({currency1: 'BCH'});
		}, 3000);
	}

	changeLimit = (event) => {
		this.setState({limit: event.target.value});
		localStorage.setItem('limit', event.target.value);
	};

	changeUnit = (event) => {
		this.setState({unit: event.target.value});
		localStorage.setItem('unit', event.target.value);
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

				<Graph unit={this.state.unit} limit={this.state.limit} currency={[this.state.currency1, this.state.currency2]} />
				{/*<SampleSummary />*/}
			</div>
		)
	}
}
