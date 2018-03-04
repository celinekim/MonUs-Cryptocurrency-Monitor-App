export const Login = () =>
	<div id="login">
		<div class="container-wrapper">
			<div class="container">
				<div class="row">
					<div class="content-container col s12 m6 offset-m3">
						<div class="card login-card">
							<div class="card-content">
								<span class="card-title">Login</span>
								<div class="row">
									<div class="input-field col s12">
										<input id="email" type="email" class="validate" />
										<label for="email">Email</label>
									</div>
									<div class="input-field col s12">
										<input id="password" type="password" class="validate" />
										<label for="password">Password</label>
									</div>
									<div class="col s12 text-right">
										<button class="btn btn-primary waves-effect waves-light" type="submit" name="action">Login</button>
									</div>
								</div>
							</div>
							<div class="card-action">
								<p>Are you new? <a href="#signup">Sign Up</a></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>;