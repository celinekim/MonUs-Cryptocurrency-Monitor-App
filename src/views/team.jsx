import React from 'react';

import * as Team from '../const/team';


export const TeamView = () =>
	<div id="team" className="container-wrapper color-container-wrapper">
		<div className="row wide">
			<div className="content-container col s12">
				<h2 className="text-shadow">The Team</h2>
			</div>
			{
				Team.members.map((member) => (
					<div className="col s12 m6 l3" key={member.name}>
						<div className="card">
							<div className="card-image">
								<img src={`${Team.imageRoute}${member.image}`} alt={member.name} />
							</div>
							<div className="card-content">
								<h4>{member.name}</h4>
							</div>
							<div className="card-action">
								<a href={`${Team.githubLink}${member.github}`} target="_blank"><i className="fab fa-github" /></a>
								<a href={`${Team.linkedinLink}${member.linkedin}`} target="_blank"><i className="fab fa-linkedin" /></a>
							</div>
						</div>
					</div>
				))
			}
		</div>
	</div>;
