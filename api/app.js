const express = require('express');
const schema = require('./schema');
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
app.post('/new_user', (req, res) => {
	console.log("Registering new user with data:");
	req.body.password = bcrypt.hashSync(req.body.password, 10);
	console.log(req.body);
	new schema.User(req.body).save((err) => {
		if (err) {
			if (err.code === 11000) {
				// Duplicate username
				console.error("Username already exists!");
				res.sendStatus(409);
			} else {
				console.error(err);
			}
		} else {
			delete req.body.password;
			req.body.token = crypto.randomBytes(32).toString('hex');
			res.send(req.body);
		}
	});
});

// Login
app.post('/login', () => {

});
// Logout
app.post('/logout', () => {

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