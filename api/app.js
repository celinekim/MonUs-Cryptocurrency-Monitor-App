const express = require('express');

const app = express();
const PORT = process.env.PORT || 8000;

// Support Routes
app.get('/', (req, res) => {
});

// RESTful Routes

// CRUD for session
app.post('/user/session', user.session_post);
app.get('/user/session', user.session_get);
app.del('/user/session', user.session_del);
app.put('/user/session', user.session_put);

//CRUD for user management
app.put('/user/user', user.user_put); // Create new user
app.get('/user/user/:id', user.user_get); // Get user info with username :id
app.post('/user/user/:id', user.user_post); // Update user info with username :id
app.del('/user/user/:id', user.user_del); // Delete user with username :id



app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});