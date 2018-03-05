import React from 'react';
import { Graph } from '../components/graph';

export class MainGraph extends React.Component {
	constructor(props) {
		super(props);
		this.state = {unit: 'minute', limit: 10};
	}
	componentDidMount() {
		setTimeout(() => {
			this.setState({limit: 20});
		}, 5000);
	}
	render() {
		return (
			<div id="main-graph" className="container-wrapper color-container-wrapper">
				<h1>Past {this.state.limit} {this.state.unit}s</h1>
				<Graph limit={this.state.limit} unit={this.state.unit} />
			</div>
		)
	}
}
