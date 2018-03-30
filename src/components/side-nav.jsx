import React from 'react';
import { Link } from 'react-router-dom';
import $ from "jquery";


export class SideNav extends React.Component {
	render() {
		return (
			<ul id="side-nav" className="side-nav">
				<li>
					<div className="user-view">
						<img className="brand-logo" src="img/bitcoin.png" height="64px" alt=""/>
						{(this.props.isLoggedIn && localStorage.getItem('firstName')) ? (
							<span className="white-text name">{localStorage.getItem('firstName')} {localStorage.getItem('lastName')}</span>
						) : (
							<span className="white-text name"> </span>
						)}
						{this.props.isLoggedIn ? (
							<span className="white-text">{localStorage.getItem('username')}</span>
						) : (
							<span className="white-text">Not logged in</span>
						)}
						{(this.props.isLoggedIn && localStorage.getItem('email')) ? (
							<span className="white-text email">{localStorage.getItem('email')}</span>
						) : (
							<span className="white-text email"> </span>
						)}

					</div>
				</li>
				<li><Link to="/" onClick={() => $('#sideNavButton').sideNav('hide')}><i className="fas fa-home"></i> Home</Link></li>
				<li><Link to="/team" onClick={() => $('#sideNavButton').sideNav('hide')}><i className="fas fa-users"></i> Team</Link></li>
				<li><Link to="/my-currency" onClick={() => $('#sideNavButton').sideNav('hide')}><i className="fas fa-chart-line"></i> {this.props.isLoggedIn ? "My Cryptocurrencies" : "Cryptocurrencies"}</Link></li>
			</ul>
		)
	}
}
