import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import { Home } from './views/home.jsx';

import './index.css';

const App = () => (
	<Router>
		<div>
			<nav>
				<div class="nav-wrapper">
					<Link to="/" class="brand-logo">MonUs</Link>
					<ul id="nav-mobile" class="right">
						<li><Link to="/about">About</Link></li>
						<li><Link to="/login">Login</Link></li>
						<li><Link to="/sign-up">Sign Up</Link></li>
						<li><Link to="/main-graph">Main Graph</Link></li>
					</ul>
				</div>
			</nav>
			<div class="content-wrapper">
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
);

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
