import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

export class SideNav extends React.Component {
	render() {
		const { isLoggedIn, user } = this.props;
		return (
			<ul id="side-nav" className="side-nav">
				<li>
					<div className="user-view">
						<img
							className="brand-logo"
							src="img/bitcoin.png"
							height="64px"
							alt=""
						/>
						{isLoggedIn && user.firstName ? (
							<span className="white-text name">
								{user.firstName} {user.lastName}
							</span>
						) : (
							<span className="white-text name"> </span>
						)}
						{isLoggedIn ? (
							<span className="white-text">{user.username}</span>
						) : (
							<span className="white-text">Not logged in</span>
						)}
						{isLoggedIn && user.email ? (
							<span className="white-text email">{user.email}</span>
						) : (
							<span className="white-text email"> </span>
						)}
					</div>
				</li>
				<li>
					<Link to="/" onClick={() => $("#sideNavButton").sideNav("hide")}>
						<i className="fas fa-home" /> Home
					</Link>
				</li>
				<li>
					<Link to="/team" onClick={() => $("#sideNavButton").sideNav("hide")}>
						<i className="fas fa-users" /> Team
					</Link>
				</li>
				{isLoggedIn && (
					<li>
						<Link
							to="/my-currency"
							onClick={() => $("#sideNavButton").sideNav("hide")}
						>
							<i className="fas fa-chart-line" />My Cryptocurrencies
						</Link>
					</li>
				)}
			</ul>
		);
	}
}
