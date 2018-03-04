import React from 'react';

export const SignUp = () =>
	<div id="signup">
		<div class="container-wrapper">
			<div class="container">
				<div class="row">
					<div class="content-container col s12 m6 offset-m3">
						<div class="card signup-card">
							<div class="card-content">
								<span class="card-title">Sign Up</span>
								<div class="row">
									<div class="input-field col s12">
										<input id="firstname" type="text" class="validate" />
										<label for="firstname">First Name</label>
									</div>
									<div class="input-field col s12">
										<input id="lastname" type="text" class="validate" />
										<label for="lastname">Last Name</label>
									</div>
									<div class="input-field col s12">
										<input id="email" type="email" class="validate" />
										<label for="email">Email</label>
									</div>
									<div class="input-field col s12">
										<input id="username" type="text" class="validate" />
										<label for="username">Username</label>
									</div>
									<div class="input-field col s12">
										<input id="password" type="password" class="validate" />
										<label for="password">Password</label>
									</div>
									<div class="input-field col s12">
										<input id="confirmpassword" type="password" class="validate" />
										<label for="confirmpassword">Confirm Password</label>
									</div>
									<div class="col s12 text-right">
										<button class="btn btn-primary waves-effect waves-light" type="submit" name="action">Sign Up</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>;