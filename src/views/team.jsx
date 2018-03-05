import React from 'react';
import * as Const from '../const/team';

export const Team = () =>
	<div id="team" className="container-wrapper color-container-wrapper">
		<div className="row wide">
			<div className="content-container col s12">
				<h1>The Team</h1>
			</div>
			{
				Const.members.map((member) => (
					<div className="col s12 m6 l3">
						<div className="card">
							<div className="card-image">
								<img src={`${Const.imageRoute}${member.image}`} alt={member.name} />
							</div>
							<div className="card-content">
								<h4>{member.name}</h4>
							</div>
							<div className="card-action">
								<a href={`${Const.githubLink}${member.github}`} target="_blank"><i className="fab fa-github" /></a>
								<a href={`${Const.linkedinLink}${member.linkedin}`} target="_blank"><i className="fab fa-linkedin" /></a>
							</div>
						</div>
					</div>
				))
			}
		</div>
	</div>;
