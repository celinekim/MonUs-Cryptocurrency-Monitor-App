import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import $ from 'jquery';
import {sideNav} from 'materialize-css';

import { Home } from './views/home';
import { Team } from './views/team';
import { Login } from './components/login';
import { SignUp } from './components/sign-up';
import { SideNav } from './components/side-nav';
import { MainGraph } from './views/main-graph';

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
					<nav className="nav-extended">
						<div className="nav-wrapper">
							<div className="nav-left">
								<a href="#" data-activates="side-nav" id="sideNavButton"><i className="fas fa-bars"></i></a>
								<div className='brand-logo'><Link to="/"><img className="spin" src="img/bitcoin.png"/></Link></div>
							</div>
							<ul id="nav-mobile" className="right">
								<li><a id='loginModalTrigger' className='modal-trigger' onClick={() => $('#loginModal').modal('open')}>Login</a></li>
								<li><a id='signUpModalTrigger' className='modal-trigger' onClick={() => $('#signUpModal').modal('open')}>Sign Up</a></li>
							</ul>
						</div>
					</nav>
					<div className="main">
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/team" exact component={Team} />
							<Route path="/main-graph" exact component={MainGraph} />
							<Route render={() =>
								<div id="team" className="row">
									<div className="content-container col s12">
										<h2 className="text-title text-center">404 - Page not found</h2>
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
