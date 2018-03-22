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
				this.refs.password.classList.contains('valid') &&
				!this.refs.email.classList.contains('invalid')) {
			const formData = {};
			for (let i in this.refs) {
				if (this.refs[i].value) {
					formData[i] = this.refs[i].value;
				}
			}
			let option = {
				url: "http://localhost:8000/new_user",
				json: formData
			};
			Request.post(option, (err, res, body) => {
				if (err) {
					console.error(err);
				} else if (res.statusCode === 409) {
					toast(`Username ${this.refs.username.value} already exists!`, 3000);
				} else if (res.statusCode === 500) {
					toast(`Error!`, 3000);
				} else {
					for (let i in body) {
						if (body[i]) {
							localStorage.setItem(i, body[i]);
						}
					}
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
