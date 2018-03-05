import React from 'react';
import { Graph } from '../components/graph';


export class MyCurrency extends React.Component {
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
				<Graph unit={this.state.unit} limit={this.state.limit} />
			</div>
		)
	}
}
