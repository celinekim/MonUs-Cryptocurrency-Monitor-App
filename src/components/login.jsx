import React from 'react';
import $ from "jquery";
import { toast } from 'materialize-css';
import Request from "request";


export class Login extends React.Component {
	close = () => {
		$('#loginModal').modal('close');
	};

	submit = () => {
		if (this.refs.username.classList.contains('valid') &&
				this.refs.password.classList.contains('valid')) {
			const formData = {};
			for (let i in this.refs) {
				if (this.refs[i].value) {
					formData[i] = this.refs[i].value;
				}
			}
			let option = {
				url: "http://aws.domh.ca:8000/login",
				json: formData
			};
			Request.post(option, (err, res, body) => {
				if (err) {
					console.error(err);
				} else if (res.statusCode === 401) {
					toast(`Incorrect Password!`, 3000);
				} else if (res.statusCode === 403) {
					toast(`User does not exist!`, 3000);
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
			<div id='loginModal' className='modal'>
				<form className='login-form'>
					<div className='modal-content'>
						<div className="modal-title-container col s12">
							<h3 className="modal-title">Login</h3>
						</div>
						<div className="input-field col s12">
							<input id="loginUsername" type="text" ref="username" className="validate" />
							<label htmlFor="loginUsername">Username</label>
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
