import React from "react";
import $ from "jquery";
import { toast } from "materialize-css";
import Request from "request";

export class SignUp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			firstName: "",
			lastName: "",
			email: ""
		};
		// this.onSubmit = this.onSubmit.bind(this);
	}
	close = () => {
		$("#signUpModal").modal("close");
	};

	submit = () => {
		const { logIn } = this.props;
		const { username, password, firstName, lastName, email } = this.state;
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (
			username.length > 0 &&
			password.length > 0 &&
			firstName.length > 0 &&
			lastName.length > 0 &&
			(!email || re.test(email.toLowerCase()))
		) {
			const formData = { username, password, firstName, lastName, email };

			let option = {
				url: "http://localhost:8000/signup",
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
					localStorage.setItem("_id", body._id);
					localStorage.setItem("sessionToken", body.sessionToken);
					const userdata = JSON.parse(JSON.stringify(body));
					delete userdata.sessionToken;
					delete userdata._id;
					toast(`Logged in as ${body.username}`, 3000);
					this.close();
					this.props.logIn(userdata);
				}
			});
		}
	};

	render() {
		const { username, firstName, lastName, email, password } = this.state;
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const isEnable =
			username.length > 0 &&
			password.length > 0 &&
			firstName.length > 0 &&
			lastName.length > 0 &&
			(!email || re.test(email.toLowerCase()));
		return (
			<div id="signUpModal" className="modal">
				<form className="sign-up-form">
					<div className="modal-content">
						<div className="modal-title-container col s12">
							<h3 className="modal-title">Sign Up</h3>
						</div>
						<div className="input-field col s12">
							<input
								id="signUpUsername"
								type="text"
								value={username}
								onChange={e => this.setState({ username: e.target.value })}
								className="validate"
								required
								aria-required="true"
							/>
							<label htmlFor="signUpFirstname">Username *</label>
						</div>
						<div className="input-field col s12">
							<input
								id="signUpFirstname"
								type="text"
								value={firstName}
								onChange={e => this.setState({ firstName: e.target.value })}
								required
								aria-required="true"
							/>
							<label htmlFor="signUpFirstname">First Name *</label>
						</div>
						<div className="input-field col s12">
							<input
								id="signUpLastname"
								type="text"
								value={lastName}
								onChange={e => this.setState({ lastName: e.target.value })}
								required
								aria-required="true"
							/>
							<label htmlFor="signUpLastname">Last Name *</label>
						</div>
						<div className="input-field col s12">
							<input
								id="signUpEmail"
								type="email"
								ref="email"
								value={email}
								onChange={e => this.setState({ email: e.target.value })}
								className="validate"
							/>
							<label htmlFor="signUpEmail">Email</label>
						</div>
						<div className="input-field col s12">
							<input
								id="signUpPassword"
								type="password"
								value={password}
								onChange={e => this.setState({ password: e.target.value })}
								className="validate"
								required
								aria-required="true"
							/>
							<label htmlFor="signUpPassword">Password *</label>
						</div>
					</div>
					<div className="modal-footer">
						<button
							className="waves-effect modal-action btn-flat"
							type="button"
							onClick={this.close}
						>
							Cancel
						</button>
						<button
							className="waves-effect modal-action btn-flat"
							type="button"
							onClick={this.submit}
							disabled={!isEnable}
						>
							Sign Up
						</button>
					</div>
				</form>
			</div>
		);
	}
}
