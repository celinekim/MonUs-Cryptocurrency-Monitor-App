import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import $ from 'jquery';
import {sideNav} from 'materialize-css';

import { Home } from './views/home.jsx';
import { Team } from './views/team.jsx';
import { Login } from './components/login.jsx';
import { SignUp } from './components/sign-up.jsx';
import { SideNav } from './components/side-nav.jsx';
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
					<SideNav />
					<nav class="nav-extended">
						<div class="nav-wrapper">
							<div class="nav-left">
								<a href="#" data-activates="side-nav" id="sideNavButton"><i class="fas fa-bars"></i></a>
								<div class='brand-logo'><Link to="/"><img class="spin" src="favicon.png"/></Link></div>
							</div>
							<ul id="nav-mobile" class="right">
								<li><a id='loginModalTrigger' class='modal-trigger' onClick={() => $('#loginModal').modal('open')}>Login</a></li>
								<li><a id='signUpModalTrigger' class='modal-trigger' onClick={() => $('#signUpModal').modal('open')}>Sign Up</a></li>
							</ul>
						</div>
					</nav>
					<div class="main">
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/team" exact component={Team} />
							<Route path="/main-graph" exact component={MainGraph} />
							<Route render={() =>
								<div id="team" class="row">
									<div class="content-container col s12">
										<h2 class="text-title text-center">404 - Page not found</h2>
									</div>
								</div>
							} />
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
