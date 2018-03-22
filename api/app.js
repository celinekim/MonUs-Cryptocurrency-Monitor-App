const express = require('express');

const app = express();
const PORT = process.env.PORT || 8000;

// Support Routes
app.get('/', (req, res) => {
  console.log(req);
  res.send('hello world');
});

// RESTful Routes

// User management
// Create new user
app.post('/user', () => {

});
// Login
app.post('/login', () => {

});
// Logout
app.post('/logout', () => {

});


// Currency/Transaction
// Get current wallet/balance
app.get('/wallet', () => {

});
// Create a new transaction
app.post('/transaction', () => {

});


app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});