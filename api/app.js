const express = require('express');

const app = express();
const PORT = process.env.PORT || 8000;

// Support Routes
app.get('/', (req, res) => {
});

// RESTful Routes
app.get('/user', SOMETHING SOMETHING);


app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});