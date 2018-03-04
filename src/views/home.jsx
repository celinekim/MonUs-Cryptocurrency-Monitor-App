import React from 'react';
import $ from 'jquery';
import Chart from 'chart.js';

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function addData(chart, label) {
	chart.data.labels.push(new Date());
	chart.data.datasets.forEach((dataset) => {
	    dataset.data.push(getRandomInt(10));
	});
	chart.update();
}

export class Home extends React.Component {

	render() {
		var start = 0
		$(document).ready(function() {
			var graph =  $("#sampleGraph")
			var chart = new Chart(graph, {
				type: 'line',
				data: {
					label: new Date(),
					datasets: [{ 
						data: [getRandomInt(10)],
						label: "BTC",
						borderColor: "#f7931a",
						fill: false
						}, { 
					data: [getRandomInt(10)],
						label: "ETH",
						borderColor: "#90A4AE",
						fill: false
					}, { 
						data: [getRandomInt(10)],
						label: "LTC",
						borderColor: "#03A9F4",
						fill: false
					}]
				},
				options: {
					title: {
						display: true,
						text: 'USD to Cryptocurrency'
					},
					scales: {
						xAxes: [{
							type: 'time',
							time: {
								displayFormats: {
									'second': 'HH:MM:ss'
								}
							}
						}]
					}
				}
			})
			setInterval(function() {
				addData(chart)
			}, 5000)
		})
		return (
			<div id="home">
				<div class="container-wrapper">
					<div class="container">
						<canvas id="sampleGraph" width="400" height="400"></canvas>
						<div class="row">
							<div class="content-container col s12 l6">
								<h2 class="text-title">About MonUs</h2>
								<h3 class="text-subtitle">Monitor Your Cryptocurrency!</h3>
								<p class="text-content">Lorem ipsum dolor sit amet, in vitae dapibus justo diam augue odio. Et quis, interdum ipsum metus, eu vitae felis nisl semper sapien cras. Sed wisi et sociosqu pede mauris. Mauris est tristique massa integer et, dui vel pellentesque, vel non dignissim vel mauris rhoncus pretium, duis sed ante wisi nulla nulla id, ultrices praesent odio elit mus varius. Eget lorem ultricies, eget sit vel suscipit nec morbi, nulla amet reprehenderit ante nunc donec ac, nulla commodo sit sagittis amet in dolor, lectus in proin. Elit malesuada parturient ultricies wisi sed accumsan, in dapibus elit luctus, eu sapien nam proin quis lorem ut.</p>
							</div>
							<div class="image-container col s12 l6">
								<img class="responsive-img profile-img" src="http://via.placeholder.com/640x480"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
