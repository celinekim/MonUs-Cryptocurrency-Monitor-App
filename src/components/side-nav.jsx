import React from 'react';
import { Link } from 'react-router-dom';
import $ from "jquery";

export const SideNav = () =>
	<ul id="side-nav" class="side-nav">
		<li>
			<div class="user-view">
				<div class="background">
					<img src="img/financial-district.jpg" height="100%"/>
				</div>
				<img class="brand-logo" src="img/bitcoin.png" height="64px"/>
				<span class="white-text name">Test User</span>
				<span class="white-text email">test.user@email.com</span>
			</div>
		</li>
		<li><Link to="/" onClick={() => $('#sideNavButton').sideNav('hide')}><i class="fas fa-home"></i> Home</Link></li>
		<li><Link to="/team" onClick={() => $('#sideNavButton').sideNav('hide')}><i class="fas fa-users"></i> Team</Link></li>
		<li><Link to="/main-graph" onClick={() => $('#sideNavButton').sideNav('hide')}><i class="fas fa-chart-line"></i> Graphs</Link></li>
	</ul>;