const express = require('express');
const schema = require('./schema');
const bodyParser = require('body-parser')

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// RESTful Routes

// User management
// Create new user
app.post('/new_user', (req, res) => {
	console.log(req.body);
	res.send(req.body);
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