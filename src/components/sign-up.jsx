import React from 'react';
import $ from "jquery";

export const SignUp = () =>
	<div id='signUpModal' class='modal'>
		<form class='sign-up-form'>
			<div class='modal-content'>
				<h3>Sign Up</h3>
				<div class="input-field col s12">
					<input id="signUpFirstname" type="text" class="validate" />
					<label for="signUpFirstname">First Name</label>
				</div>
				<div class="input-field col s12">
					<input id="signUpLastname" type="text" class="validate" />
					<label for="signUpLastname">Last Name</label>
				</div>
				<div class="input-field col s12">
					<input id="signUpEmail" type="email" class="validate" />
					<label for="signUpEmail">Email</label>
				</div>
				<div class="input-field col s12">
					<input id="signUpUsername" type="text" class="validate" />
					<label for="signUpUsername">Username</label>
				</div>
				<div class="input-field col s12">
					<input id="signUpPassword" type="password" class="validate" />
					<label for="signUpPassword">Password</label>
				</div>
				<div class="input-field col s12">
					<input id="signUpConfirmpassword" type="password" class="validate" />
					<label for="signUpConfirmpassword">Confirm Password</label>
				</div>
			</div>
			<div class="modal-footer">
				<button class="waves-effect modal-action btn-flat" type="button" onClick={() => $('#signUpModal').modal('close')}>Cancel</button>
				<button class="waves-effect modal-action btn-flat" type="submit">Login</button>
			</div>
		</form>
	</div>;
