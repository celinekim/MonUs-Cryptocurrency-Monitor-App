import React from "react";
import * as Const from '../const/currency';

export class SampleSummary extends React.Component {
    constructor(props) {
        super(props);
        const temp = {};
        props.dataset.forEach(item => {
            if (item.data && item.data.length > 0) {
                temp[item.label] = item.data.slice(-1)[0];
            }
        });
        this.state = {
            assets: Const.userAsset,
            currencies: temp,
        }
    }
    componentWillReceiveProps(nextProps) {
        const temp = {};
        nextProps.dataset.forEach(item => {
            if (item.data && item.data.length > 0) {
                temp[item.label] = item.data.slice(-1)[0];
            }
        });
        this.setState({ currencies: temp });
    }
	render() {
        const { dataset } = this.props;
        const { assets, currencies } = this.state;

		return (
            <table>
                <thead>
                <tr>
                    <th>Currency name</th>
                    <th>Quantity</th>
                    <th>USD</th>
                </tr>
                </thead>

                <tbody>
                    {assets.map((item, i) => (
                        <tr key={i}>
                            <td>{item.symbol}</td>
                            <td>{item.amount}</td>
                            <td>{currencies[item.symbol] ? currencies[item.symbol] * item.amount : 'calculating'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
	}
}