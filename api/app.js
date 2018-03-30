const express = require('express');
const Schema = require('./schema');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});


// RESTful Routes

// User management
// Create new user
app.post('/signup', (req, res) => {
	console.log(`Registering new user with data:${req.body}`);
	const user = req.body;
	user.password = bcrypt.hashSync(req.body.password, 10);
	user.sessionToken = crypto.randomBytes(32).toString('hex');
	new Schema(user).save((err, prod) => {
		if (err) {
			if (err.code === 11000) {
				// Duplicate username
				console.error("Username already exists!");
				res.sendStatus(409);
			} else {
				console.error(err);
				res.sendStatus(500);
			}
		} else {
			const userData = prod.toObject();
			delete userData.password;
			res.send(userData);
		}
	});
});

// Login
app.post('/login', (req, res) => {
	console.log(`Logging in user ${req.body.username}`);
	const username = req.body.username;
	const password = req.body.password;

	Schema.findOne({username}, (err, prod) => {
		if (err) {
			console.error(err);
			res.sendStatus(500);
		} else {
			if (!prod) {
				console.error("User does not exist!");
				res.sendStatus(403);
			} else if (bcrypt.compareSync(password, prod.password)) {
				console.log("Correct password!");
				const userData = prod.toObject();
				delete userData.password;

				userData.sessionToken = crypto.randomBytes(32).toString('hex');

				Schema.findByIdAndUpdate(prod._id, { $set: { sessionToken: userData.sessionToken }},
					(error) => {
						if (error) {
							console.error(err);
						} else {
							console.log('login', userData);
							res.send(userData);
						}
					}
				);
			} else {
				console.error("Wrong password!");
				res.sendStatus(401);
			}
		}
	});
});

// Logout
app.post('/logout', (req, res) => {
	Schema.findByIdAndUpdate(req.body.userID, {$unset: { sessionToken: "" } },
		(err, prod) => {
			if (err) {
				console.error(err);
				res.sendStatus(500);
			} else {
				console.log(`Deleted ${prod.n} sessions from ${req.body.userID}`);
				if (prod.n === 1) {
					res.sendStatus(200);
				} else {
					res.sendStatus(202);
				}
			}
		}
	);
});


// Currency/Transaction
// Get current wallet/balance
app.post('/wallet', (req, res) => {
	Schema.findById(req.body.userID, (err, prod) => {
		if (err) {
			console.error(err);
			res.sendStatus(500);
		} else {
			let payload = {USD: prod.balance};
			for (let i in prod.wallet) {
				payload[prod.wallet[i].currency] = prod.wallet[i].amount;
			}
			res.send(payload);
		}
	});
});
// Create a new transaction
app.post('/transaction', () => {

});


app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});