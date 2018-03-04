import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import $ from 'jquery';
import {sideNav} from 'materialize-css';

import { Home } from './views/home.jsx';
import { About } from './views/about.jsx';
import { Login } from './components/login.jsx';
import { SignUp } from './components/sign-up.jsx';
import { MainGraph } from './views/main-graph.jsx';

import './index.css';


class App extends React.Component {
	render() {
		$(document).ready(function() {
			$('#sideNavButton').sideNav()
			$('#loginModal').modal()
			$('#signUpModal').modal()
		})
		return (
			<Router>
				<div>
					<Login />
					<SignUp />
					<nav>
						<div class="nav-wrapper">
							<a href="#" data-activates="slide-out" id="sideNavButton" class="brand-logo"><img class="spin" src="favicon.png"/></a>
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
									<img src="background/financial-district.jpg" />
								</div>
								<a href="#"><img class="circle" src="favicon.png"/></a>
								<span class="white-text name">Test User</span>
								<span class="white-text email">test.user@email.com</span>
							</div>
						</li>
						<li><a href="#/"> Home</a></li>
						<li><a href="#/about" >About</a></li>
						<li><a href="#/main-graph">Graphs</a></li>
					</ul>
					<div class="content-wrapper main">
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/about" exact component={About} />
							<Route path="/login" exact component={Login} />
							<Route path="/sign-up" exact component={SignUp} />
							<Route path="/main-graph" exact component={MainGraph} />
							<Route render={() => <h1>Page not found</h1>} />
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
