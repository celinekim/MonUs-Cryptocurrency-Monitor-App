import React from 'react';
import $ from "jquery";

export const Login = () =>
	<div id='loginModal' className='modal'>
		<form className='login-form'>
			<div className='modal-content'>
				<h3>Login</h3>
				<div className="input-field col s12">
					<input id="loginEmail" type="email" className="validate" />
					<label for="loginEmail">Email</label>
				</div>
				<div className="input-field col s12">
					<input id="loginPassword" type="password" className="validate" />
					<label for="loginPassword">Password</label>
				</div>
			</div>
			<div className="modal-footer">
				<button className="waves-effect modal-action btn-flat" type="button" onClick={() => $('#loginModal').modal('close')}>Cancel</button>
				<button className="waves-effect modal-action btn-flat" type="submit">Login</button>
			</div>
		</form>
	</div>;
