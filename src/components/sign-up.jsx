import React from 'react';
import $ from "jquery";
import {toast} from "materialize-css";
import Request from "request";


export class SignUp extends React.Component {
	close = () => {
		$('#signUpModal').modal('close');
	};

	submit = () => {
		if (this.refs.username.classList.contains('valid') &&
				this.refs.password.classList.contains('valid')) {
			let formData = {
				username: this.refs.username.value,
				password: this.refs.password.value,
				firstName: this.refs.firstName.value,
				lastName: this.refs.lastName.value,
				email: this.refs.email.value,
			};
			Object.keys(formData).forEach((key) => (!formData[key]) && delete formData[key]);
			let option = {
				url: "http://localhost:8000/new_user",
				json: formData
			};
			Request.post(option, (error, res, body) => {
				if (res.statusCode === 409) {
					toast(`Username ${this.refs.username.value} already exists!`, 3000);
				} else {
					localStorage.setItem('username', body.username);
					localStorage.setItem('firstName', body.firstName);
					localStorage.setItem('lastName', body.lastName);
					localStorage.setItem('email', body.email);
					localStorage.setItem('token', body.token);
					toast(`Logged in as ${body.username}`, 3000);
					this.close();
					this.props.logIn();
				}
			});
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
							<input id="signUpUsername" type="text" ref="username" className="validate" required/>
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
							<input id="signUpEmail" type="email" ref="email" className="validate"/>
							<label htmlFor="signUpEmail">Email</label>
						</div>
						<div className="input-field col s12">
							<input id="signUpPassword" type="password" ref="password" className="validate" required/>
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
