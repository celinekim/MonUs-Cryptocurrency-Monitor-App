import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import $ from 'jquery';
import {sideNav} from 'materialize-css';

import { Home } from './views/home.jsx';
import { Team } from './views/team.jsx';
import { Login } from './components/login.jsx';
import { SignUp } from './components/sign-up.jsx';
import { MainGraph } from './views/main-graph.jsx';

import './index.css';

class App extends React.Component {
	componentDidMount() {
		$('#sideNavButton').sideNav();
		$('#loginModal').modal();
		$('#signUpModal').modal();
	}

	render() {
		return (
			<Router>
				<div>
					<Login />
					<SignUp />
					<nav class="nav-extended">
						<div class="nav-wrapper">
							<div class="nav-left">
								<a href="#" data-activates="slide-out" id="sideNavButton"><i class="material-icons">menu</i></a>
								<div class='brand-logo'><a href="/"><img class="spin" src="favicon.png"/></a></div>
							</div>
							<ul id="nav-mobile" class="right">
								<li><a id='loginModalTrigger' class='modal-trigger' onClick={() => $('#loginModal').modal('open')}>Login</a></li>
								<li><a id='signUpModalTrigger' class='modal-trigger' onClick={() => $('#signUpModal').modal('open')}>Sign Up</a></li>
							</ul>
						</div>
					</nav>
					<ul id="slide-out" class="side-nav">
						<li>
							<div class="user-view">
								<div class="background">
									<img src="background/financial-district.jpg" width="100%"/>
								</div>
								<img class="brand-logo" src="favicon.png"/>
								<span class="white-text name">Test User</span>
								<span class="white-text email">test.user@email.com</span>
							</div>
						</li>
						<li><Link to="/" onClick={() => $('#sideNavButton').sideNav('hide')}> Home</Link></li>
						<li><Link to="/team" onClick={() => $('#sideNavButton').sideNav('hide')}>Team</Link></li>
						<li><Link to="/main-graph" onClick={() => $('#sideNavButton').sideNav('hide')}>Graphs</Link></li>
					</ul>
					<div class="main">
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/team" exact component={Team} />
							<Route path="/main-graph" exact component={MainGraph} />
							<Route render={() => <div id="team" class="row">
													<div class="content-container col s12">
														<h2 class="text-title text-center">404 - Page not found</h2>
													</div>
												</div>} />
						</Switch>
					</div>
				</div>
			</Router>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
