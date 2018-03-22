import React from 'react';
import $ from "jquery";
import { toast } from 'materialize-css';


export class Login extends React.Component {
	close = () => {
		$('#loginModal').modal('close');
	};

	submit = () => {
		if (this.refs.username.classList.contains('valid') &&
				this.refs.password.classList.contains('valid')) {
			this.close();
			localStorage.setItem('username', this.refs.username.value);
			toast(`Logged in as ${localStorage.email}`, 3000);
			this.props.logIn();
		}
	};

	render() {
		return (
			<div id='loginModal' className='modal'>
				<form className='login-form'>
					<div className='modal-content'>
						<div className="modal-title-container col s12">
							<h3 className="modal-title">Login</h3>
						</div>
						<div className="input-field col s12">
							<input id="loginEmail" type="text" ref="username" className="validate" />
							<label htmlFor="loginEmail">Username</label>
						</div>
						<div className="input-field col s12">
							<input id="loginPassword" type="password" ref="password" className="validate" />
							<label htmlFor="loginPassword">Password</label>
						</div>
					</div>
					<div className="modal-footer">
						<button className="waves-effect modal-action btn-flat" type="button" onClick={this.close}>Cancel</button>
						<button className="waves-effect modal-action btn-flat" type="button" onClick={this.submit}>Login</button>
					</div>
				</form>
			</div>
		)
	}
}
