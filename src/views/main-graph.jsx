import React from 'react';
import { DataDisplay } from '../components/data-display';


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
				<DataDisplay unit={this.state.unit} limit={this.state.limit} />
			</div>
		)
	}
}
