import React from 'react';
import $ from "jquery";
import {toast} from "materialize-css";

export class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
	}

	close() {
		$('#signUpModal').modal('close');
	}

	submit() {
		if (this.refs.firstName.classList.contains('valid') &&
				this.refs.lastName.classList.contains('valid') &&
				this.refs.email.classList.contains('valid') &&
				this.refs.password.classList.contains('valid')) {
			this.close();
			localStorage.setItem('firstName', this.refs.firstName.value);
			localStorage.setItem('lastName', this.refs.lastName.value);
			localStorage.setItem('email', this.refs.email.value);
			toast(`Logged in as ${localStorage.firstName} ${localStorage.lastName}`, 3000);
		}
	}

	render() {
		return (
			<div id='signUpModal' className='modal'>
				<form className='sign-up-form'>
					<div className='modal-content'>
						<div className="modal-title-container col s12">
							<img className="brand-logo" src="/img/bitcoin.png" height="64px"/>
							<h3 className="modal-title">Sign Up</h3>
						</div>
						<div className="input-field col s12">
							<input id="signUpFirstname" type="text" ref="firstName" className="validate"/>
							<label htmlFor="signUpFirstname">First Name</label>
						</div>
						<div className="input-field col s12">
							<input id="signUpLastname" type="text" ref="lastName" className="validate"/>
							<label htmlFor="signUpLastname">Last Name</label>
						</div>
						<div className="input-field col s12">
							<input id="signUpEmail" type="email" ref="email" className="validate"/>
							<label htmlFor="signUpEmail">Email</label>
						</div>
						<div className="input-field col s12">
							<input id="signUpPassword" type="password" ref="password" className="validate"/>
							<label htmlFor="signUpPassword">Password</label>
						</div>
					</div>
					<div className="modal-footer">
						<button className="waves-effect modal-action btn-flat" type="button" onClick={this.close}>Cancel</button>
						<button className="waves-effect modal-action btn-flat" type="button" onClick={this.submit}>Sign Up</button>
					</div>
				</form>
			</div>
		)
	}
}
