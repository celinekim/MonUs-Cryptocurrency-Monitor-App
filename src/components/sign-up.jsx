import React from 'react';
import $ from "jquery";

export const SignUp = () =>
	<div id='signUpModal' className='modal'>
		<form className='sign-up-form'>
			<div className='modal-content'>
				<div className="modal-title-container col s12">
					<img className="brand-logo" src="/img/bitcoin.png" height="64px" />
					<h3 className="modal-title">Sign Up</h3>
				</div>
				<div className="input-field col s12">
					<input id="signUpFirstname" type="text" className="validate" />
					<label for="signUpFirstname">First Name</label>
				</div>
				<div className="input-field col s12">
					<input id="signUpLastname" type="text" className="validate" />
					<label for="signUpLastname">Last Name</label>
				</div>
				<div className="input-field col s12">
					<input id="signUpEmail" type="email" className="validate" />
					<label for="signUpEmail">Email</label>
				</div>
				<div className="input-field col s12">
					<input id="signUpUsername" type="text" className="validate" />
					<label for="signUpUsername">Username</label>
				</div>
				<div className="input-field col s12">
					<input id="signUpPassword" type="password" className="validate" />
					<label for="signUpPassword">Password</label>
				</div>
				<div className="input-field col s12">
					<input id="signUpConfirmpassword" type="password" className="validate" />
					<label for="signUpConfirmpassword">Confirm Password</label>
				</div>
			</div>
			<div className="modal-footer">
				<button className="waves-effect modal-action btn-flat" type="button" onClick={() => $('#signUpModal').modal('close')}>Cancel</button>
				<button className="waves-effect modal-action btn-flat" type="submit">Login</button>
			</div>
		</form>
	</div>;
