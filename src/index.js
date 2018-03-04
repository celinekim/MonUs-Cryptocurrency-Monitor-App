import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import $ from 'jquery';
import {sideNav} from 'materialize-css';

import { Home } from './views/home.jsx';
import { About } from './views/about.jsx';
import { Login } from './views/login.jsx';
import { SignUp } from './views/sign-up.jsx';
import { MainGraph } from './views/main-graph.jsx';

import './index.css';


class App extends React.Component {
	loginModalOpen() {
		$('#loginModal').modal('open')
	}
	loginModalClose() {
		$('#loginModal').modal('close')
	}
	signUpModalOpen() {
		$('#signUpModal').modal('open')
	}
	signUpModalClose() {
		$('#signUpModal').modal('close')
	}
	render() {
		$( document ).ready(function() {
			$('#sideNavButton').sideNav()
			$('#loginModal').modal()
			$('#signUpModal').modal()
		})
		return (
			<Router>
				<div>
					<nav>
						<div class="nav-wrapper">
							<a href="#" data-activates="slide-out" id="sideNavButton" class="brand-logo"><img class="spin" src="favicon.png"/></a>
							<ul id="nav-mobile" class="right">
								<li><a id='loginModalTrigger' class='modal-trigger' onClick={this.loginModalOpen}>Login</a></li>
								<li><a id='signUpModalTrigger' class='modal-trigger' onClick={this.signUpModalOpen}>Sign Up</a></li>
							</ul>
						</div>
					</nav>
					<div id='loginModal' class='modal'>
						<form class='login-form'>
							<div class='modal-content'>
								<h3>Login</h3>
								<div class="input-field col s12">
									<input id="loginEmail" type="email" class="validate" />
									<label for="loginEmail">Email</label>
								</div>
								<div class="input-field col s12">
									<input id="loginPassword" type="password" class="validate" />
									<label for="loginPassword">Password</label>
								</div>
							</div>
							<div class="modal-footer">
								<button class="waves-effect waves-teal modal-action btn-flat" type="button" onClick={this.loginModalClose}>Cancel</button>
								<button class="waves-effect waves-teal modal-action btn-flat" type="submit">Login</button>
							</div>
						</form>
					</div>
					<div id='signUpModal' class='modal'>
						<form class='sign-up-form'>
							<div class='modal-content'>
								<h3>Sign Up</h3>
								<div class="input-field col s12">
									<input id="signUpFirstname" type="text" class="validate" />
									<label for="signUpFirstname">First Name</label>
								</div>
								<div class="input-field col s12">
									<input id="signUpLastname" type="text" class="validate" />
									<label for="signUpLastname">Last Name</label>
								</div>
								<div class="input-field col s12">
									<input id="signUpEmail" type="email" class="validate" />
									<label for="signUpEmail">Email</label>
								</div>
								<div class="input-field col s12">
									<input id="signUpUsername" type="text" class="validate" />
									<label for="signUpUsername">Username</label>
								</div>
								<div class="input-field col s12">
									<input id="signUpPassword" type="password" class="validate" />
									<label for="signUpPassword">Password</label>
								</div>
								<div class="input-field col s12">
									<input id="signUpConfirmpassword" type="password" class="validate" />
									<label for="signUpConfirmpassword">Confirm Password</label>
								</div>
							</div>
							<div class="modal-footer">
								<button class="waves-effect waves-teal modal-action btn-flat" type="button" onClick={this.signUpModalClose}>Cancel</button>
								<button class="waves-effect waves-teal modal-action btn-flat" type="submit">Login</button>
							</div>
						</form>
					</div>
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
