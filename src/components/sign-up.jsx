import React from 'react';
import $ from "jquery";
import {toast} from "materialize-css";


export class SignUp extends React.Component {
	close = () => {
		$('#signUpModal').modal('close');
	};

	submit = () => {
		if (this.refs.username.classList.contains('valid') &&
				this.refs.password.classList.contains('valid')) {
			this.close();
			localStorage.setItem('firstName', this.refs.firstName.value);
			localStorage.setItem('lastName', this.refs.lastName.value);
			localStorage.setItem('username', this.refs.username.value);
			toast(`Logged in as ${localStorage.firstName} ${localStorage.lastName}`, 3000);
			this.props.logIn();
		}
	};

	render() {
		return (
			<div id='signUpModal' className='modal'>
				<form className='sign-up-form'>
					<div className='modal-content'>
						<div className="modal-title-container col s12">
							<h3 className="modal-title">Sign Up</h3>
						</div>
						<div className="input-field col s12">
							<input id="signUpUsername" type="text" ref="username" className="validate"/>
							<label htmlFor="signUpFirstname">Username</label>
						</div>
						<div className="input-field col s12">
							<input id="signUpFirstname" type="text" ref="firstName"/>
							<label htmlFor="signUpFirstname">First Name</label>
						</div>
						<div className="input-field col s12">
							<input id="signUpLastname" type="text" ref="lastName"/>
							<label htmlFor="signUpLastname">Last Name</label>
						</div>
						<div className="input-field col s12">
							<input id="signUpEmail" type="email" ref="email"/>
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
