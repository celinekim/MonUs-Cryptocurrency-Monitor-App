import React from 'react';
import { Link } from 'react-router-dom';
import $ from "jquery";

export const SideNav = () =>
	<ul id="side-nav" className="side-nav">
		<li>
			<div className="user-view">
				<div className="background">
					<img src="img/financial-district.jpg" height="100%"/>
				</div>
				<img className="brand-logo" src="img/bitcoin.png" height="64px"/>
				<span className="white-text name">Test User</span>
				<span className="white-text email">test.user@email.com</span>
			</div>
		</li>
		<li><Link to="/" onClick={() => $('#sideNavButton').sideNav('hide')}><i className="fas fa-home"></i> Home</Link></li>
		<li><Link to="/team" onClick={() => $('#sideNavButton').sideNav('hide')}><i className="fas fa-users"></i> Team</Link></li>
		<li><Link to="/main-graph" onClick={() => $('#sideNavButton').sideNav('hide')}><i className="fas fa-chart-line"></i> Graphs</Link></li>
	</ul>;