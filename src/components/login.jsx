import React from 'react';

export const Login = () =>
	<div id='loginModal' class='modal'>
		<form class='login-form'>
			<div class='modal-content'>
				<h3>Login</h3>
				<div class="input-field col s12">
					<input id="loginEmail" type="email" class="validate" />
					<label for="loginEmail">Email</label>
				</div>
				<div class="input-field col s12">
					<input id="loginPassword" type="password" class="validate" />
					<label for="loginPassword">Password</label>
				</div>
			</div>
			<div class="modal-footer">
				<button class="waves-effect waves-teal modal-action btn-flat" type="button" onClick={this.loginModalClose}>Cancel</button>
				<button class="waves-effect waves-teal modal-action btn-flat" type="submit">Login</button>
			</div>
		</form>
	</div>;