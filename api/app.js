const express = require("express");
const Schema = require("./schema");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const request = require("request");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

// RESTful Routes

// User management
// Create new user
app.post("/signup", (req, res) => {
	console.log(`Registering new user with data:${req.body}`);
	const user = req.body;
	user.password = bcrypt.hashSync(req.body.password, 10);
	user.sessionToken = crypto.randomBytes(32).toString("hex");
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
app.post("/login", (req, res) => {
	console.log(`Logging in user ${req.body.username}`);
	Schema.findOne({ username: req.body.username }, (err, prod) => {
		if (err) {
			console.error(err);
			res.sendStatus(500);
		} else {
			if (!prod) {
				console.error("User does not exist!");
				res.sendStatus(403);
			} else if (bcrypt.compareSync(req.body.password, prod.password)) {
				console.log("Correct password!");
				prod.set("sessionToken", crypto.randomBytes(32).toString("hex"));
				prod.save();

				const userData = prod.toObject();
				delete userData.password;
				res.send(userData);
			} else {
				console.error("Wrong password!");
				res.sendStatus(401);
			}
		}
	});
});

// Get user info
app.get("/user/:_id/:sessionToken", (req, res) => {
	console.log(`Check if user ${req.params} is logged in`);
	console.log(req.params);
	if (!req.params.sessionToken) {
		console.log("User not logged in");
		res.sendStatus(401);
	} else {
		Schema.findOne(req.params, (err, prod) => {
			console.log(err, prod);
			if (err) {
				console.error(err);
				res.sendStatus(500);
			} else if (prod === null) {
				console.log("User not logged in");
				res.sendStatus(401);
			} else {
				const userData = prod.toObject();
				delete userData.password;
				delete userData._id;
				delete userData.sessionToken;

				res.send(userData);
			}
		});
	}
});

// Logout
app.post("/logout", (req, res) => {
	Schema.findOne(req.body, (err, prod) => {
		if (err) {
			console.error(err);
			res.sendStatus(500);
		} else if (prod === null) {
			res.sendStatus(202);
		} else {
			prod.set("sessionToken", null);
			prod.save();
			res.sendStatus(200);
		}
	});
});

// Currency/Transaction
// Get current wallet/balance
app.post("/wallet", (req, res) => {
	Schema.findOne(req.body, (err, prod) => {
		if (err) {
			console.error(err);
			res.sendStatus(500);
		} else if (prod === null) {
			res.sendStatus(403);
		} else {
			res.send(prod.wallet);
		}
	});
});
// Create a new transaction
app.post("/transaction", (req, res) => {
	Schema.findOne(req.body.credentials, (err, prod) => {
		if (err) {
			console.error(err);
			res.sendStatus(500);
		} else if (prod === null) {
			res.sendStatus(403);
		} else {
			request.post(
				{
					url: `https://min-api.cryptocompare.com/data/price?fsym=${
						req.body.symbol
					}&tsyms=USD`,
					json: true
				},
				(err, response, body) => {
					if (req.body.amount === "MAX") {
						req.body.amount = prod.wallet.USD / body.USD;
					}
					let USDAmount = prod.wallet.USD - body.USD * req.body.amount;
					let symbolAmount = prod.wallet[req.body.symbol] + req.body.amount;
					if (USDAmount >= 0 && symbolAmount >= 0) {
						prod.wallet.USD = USDAmount;
						prod.wallet[req.body.symbol] = symbolAmount;
						prod.transactions.push({
							currency: req.body.symbol,
							timestamp: Date.now(),
							amount: req.body.amount,
							unitPrice: body.USD
						});
						prod.save();
						res.send({
							wallet: prod.wallet,
							amount: Math.abs(req.body.amount)
						});
					} else {
						res.sendStatus(409);
					}
				}
			);
		}
	});
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
