import React from 'react';
import $ from "jquery";
import { toast } from 'materialize-css';

export class Login extends React.Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
	}

	close() {
		$('#loginModal').modal('close');
	}

	submit() {
		if (this.refs.email.classList.contains('valid') &&
				this.refs.password.classList.contains('valid')) {
			this.close();
			localStorage.setItem('email', this.refs.email.value);
			toast(`Logged in as ${localStorage.email}`, 3000);
		}
	}

	render() {
		return (
			<div id='loginModal' className='modal'>
				<form className='login-form'>
					<div className='modal-content'>
						<div className="modal-title-container col s12">
							<h3 className="modal-title">Login</h3>
						</div>
						<div className="input-field col s12">
							<input id="loginEmail" type="email" ref="email" className="validate" />
							<label htmlFor="loginEmail">Email</label>
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
