import React from "react";
import $ from "jquery";
import { toast } from "materialize-css";
import Request from "request";

export class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: ""
		};
		this.onSubmit = this.onSubmit.bind(this);
	}

	close = () => {
		this.setState({ username: "", password: "" });
		$("#loginModal").modal("close");
	};

	onSubmit = () => {
		const { logIn } = this.props;
		const { username, password } = this.state;
		if (username && username.length > 0 && password && password.length > 0) {
			const formData = { username, password };
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
					localStorage.setItem("_id", body._id);
					localStorage.setItem("sessionToken", body.sessionToken);
					const userdata = JSON.parse(JSON.stringify(body));
					delete userdata.sessionToken;
					delete userdata._id;

					toast(`Logged in as ${body.username}`, 3000);
					this.setState({ username: "", password: "" });
					this.close();
					this.props.logIn(userdata);
				}
			});
		}
	};

	render() {
		const { username, password } = this.state;
		const isEnable = username.length > 0 && password.length > 0;
		return (
			<div id="loginModal" className="modal">
				<form className="login-form">
					<div className="modal-content">
						<div className="modal-title-container col s12">
							<h3 className="modal-title">Login</h3>
						</div>
						<div className="input-field col s12">
							<input
								id="loginUsername"
								type="text"
								value={username}
								onChange={e => this.setState({ username: e.target.value })}
								className="validate"
								required
								aria-required="true"
							/>
							<label htmlFor="loginUsername">Username *</label>
						</div>
						<div className="input-field col s12">
							<input
								id="loginPassword"
								type="password"
								value={password}
								onChange={e => this.setState({ password: e.target.value })}
								className="validate"
								required
								aria-required="true"
							/>
							<label htmlFor="loginPassword">Password *</label>
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
							type="submit"
							className="waves-effect modal-action btn-flat"
							type="button"
							onClick={this.onSubmit}
							disabled={!isEnable}
						>
							Login
						</button>
					</div>
				</form>
			</div>
		);
	}
}
