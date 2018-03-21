/* eslint no-console: "off" */

const express = require('express');

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const user = require('./routes/user-routes');
const crypto = require('./crypto-routes');
const transaction = require('./transaction-routes');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

// Overrides the HTTP method used.  Primarily for backwards compatibility
// but helps to ensure the server is presenting a RESTful API even when not
// fully supported by front end actions
app.use(methodOverride('_method'));

app.use(cookieParser('my very well kept secret'));


// Adding in our own middleware logger
function myLogger(req, res, next) {
  console.log('Raw Cookies: ', req.headers.cookie);
  console.log('Cookie Parser: ', req.cookies);
  console.log('Signed Cookies: ', req.signedCookies);
  if (req.body) {
    console.log('LOG:', req.method, req.url, req.body);
  }
  res.append('Set-Cookie', `lastPage= ${req.url}`);
  next();
}

app.use(myLogger);

// Not suprisingly there are logging libraries.
// Generate Apache Common Log format
app.use(morgan('common'));

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


// When running tests, we don't want to start up the server on its own.
// The test code will call different functions.
// module.parent will be true if this file is required from another file
if (!module.parent) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;
