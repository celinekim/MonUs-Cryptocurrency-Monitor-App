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


const startSession = (res, prod) => {
	delete prod.password;

	// Session
	Schema.Session.remove({userID: prod._id}, () => {
		prod.token = crypto.randomBytes(32).toString('hex');

		new Schema.Session({
			userID: prod._id,
			sessionToken: prod.token
		}).save((err) => {
			if (err) {
				console.error(err);
			} else {
				res.send(prod);
			}
		});
	});
};
// RESTful Routes

// User management
// Create new user
app.post('/signup', (req, res) => {
	console.log("Registering new user with data:");
	req.body.password = bcrypt.hashSync(req.body.password, 10);
	console.log(req.body);
	new Schema.User(req.body).save((err, prod) => {
		if (err) {
			if (err.code === 11000) {
				// Duplicate username
				console.error("Username already exists!");
				res.sendStatus(409);
			} else {
				console.error(err);
			}
		} else {
			startSession(res, prod.toObject());
		}
	});
});

// Login
app.post('/login', (req, res) => {
	console.log(`Logging in user ${req.body.username}`);
	Schema.User.findOne({username: req.body.username}, (err, prod) => {
		if (err) {
			console.error(err);
		} else {
			if (!prod) {
				console.error("User does not exist!");
				res.sendStatus(403);
			} else if (bcrypt.compareSync(req.body.password, prod.password)) {
				console.log("Correct password!");
				startSession(res, prod.toObject());
			} else {
				console.error("Wrong password!");
				res.sendStatus(401);
			}
		}
	});
});
// Logout
app.post('/logout', (req, res) => {
	Schema.Session.remove(req.body, (err, prod) => {
		if (err) {
			console.error(err);
		} else {
			console.log(`Deleted ${prod.n} sessions from ${req.body.userID}`);
			if (prod.n === 1) {
				res.sendStatus(200);
			} else {
				res.sendStatus(202);
			}
		}
	})
});


// Currency/Transaction
// Get current wallet/balance
app.get('/wallet', (req, res) => {
	console.log(req.body);
	res.send(req.body);
});
// Create a new transaction
app.post('/transaction', () => {

});


app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});