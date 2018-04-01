import React from "react";
import ReactDOM from "react-dom";
import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch,
	Redirect
} from "react-router-dom";
import $ from "jquery";
import { toast } from "materialize-css";

import { HomeView } from "./views/home";
import { TeamView } from "./views/team";
import { Login } from "./components/login";
import { SignUp } from "./components/sign-up";
import { SideNav } from "./components/side-nav";
import { CurrencyView } from "./views/currency";

import "./index.css";
import Request from "request";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false,
			userData: {}
		};
	}

	componentWillMount() {
		const _id = localStorage.getItem("_id");
		const sessionToken = localStorage.getItem("sessionToken");
		if (_id && sessionToken) {
			Request.get(
				`http://aws.domh.ca:8000/user/${_id}/${sessionToken}`,
				(err, res, body) => {
					if (err) {
						console.error(err);
					} else {
						if (res.statusCode === 200) {
							this.setState({ isLoggedIn: true, userData: JSON.parse(body) });
						}
					}
				}
			);
		}
	}

	componentDidMount() {
		$("#sideNavButton").sideNav();
		$("#loginModal").modal();
		$("#signUpModal").modal();
	}

	logIn = userData => {
		this.setState({ isLoggedIn: true, userData });
	};

	logOut = () => {
		this.setState({ isLoggedIn: null });
		Request.post(
			{
				url: "http://aws.domh.ca:8000/logout",
				json: {
					_id: localStorage.getItem("_id"),
					sessionToken: localStorage.getItem("sessionToken")
				}
			},
			(err, res, body) => {
				if (err) {
					console.error(err);
				} else {
					if (res.statusCode === 200) {
						toast("Safely logged out", 3000);
					} else {
						toast("Logged out", 3000);
					}
				}
			}
		);
		localStorage.clear();
	};

	render() {
		const { isLoggedIn, userData } = this.state;
		return (
			<Router>
				<div>
					<Login logIn={this.logIn} />
					<SignUp logIn={this.logIn} />
					<SideNav isLoggedIn={isLoggedIn} user={userData} />
					<nav className="nav-extended">
						<div className="nav-wrapper">
							<div className="nav-left">
								<a href="" data-activates="side-nav" id="sideNavButton">
									<i className="fas fa-bars" />
								</a>
								<div className="brand-logo">
									<Link to="/">
										<img className="spin" src="img/bitcoin.png" alt="" />
									</Link>
								</div>
							</div>
							{isLoggedIn ? (
								<ul id="nav-mobile" className="right">
									<li>
										{userData && userData.firstName
											? `Hello, ${userData.firstName} ${userData.lastName}`
											: `Hello, ${userData.username}`}
									</li>
									<li>
										<a id="logOut" onClick={this.logOut}>
											Log Out
										</a>
									</li>
								</ul>
							) : (
								<ul id="nav-mobile" className="right">
									<li>
										<a
											id="loginModalTrigger"
											onClick={() => $("#loginModal").modal("open")}
										>
											Login
										</a>
									</li>
									<li>
										<a
											id="signUpModalTrigger"
											onClick={() => $("#signUpModal").modal("open")}
										>
											Sign Up
										</a>
									</li>
								</ul>
							)}
						</div>
					</nav>
					<div className="main">
						<Switch>
							<Route path="/" exact component={HomeView} />
							<Route path="/team" exact component={TeamView} />
							<Route
								path="/my-currency"
								exact
								render={() =>
									isLoggedIn ? (
										<CurrencyView isLoggedIn={isLoggedIn} userData={userData} />
									) : (
										<Redirect to="/" />
									)
								}
							/>
							<Route
								render={() => (
									<div className="row">
										<div className="content-container col s12">
											<h2 className="text-title text-center">
												404 - Page not found
											</h2>
										</div>
									</div>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("root"));
