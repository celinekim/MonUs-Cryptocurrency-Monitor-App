let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let cryptoSchema = new Schema({
	name: {type: String, required: true, unique: true },
	symbol: {type: String, required: true, unique: true }
});


let userSchema = new Schema({
	username: {type: String, required: true, unique: true },
	password: {type: String, required: true},
	firstName: {type: String},
	lastName: {type: String},
	email: {type: String},
	createdAt: {type: Date},
	followingCurrencies: [{type: Schema.Types.ObjectId, ref: 'Crypto'}], // Array of cryptoID of following currencies,
	wallet: [{
		currencyID: {type: Schema.Types.ObjectId, ref: 'Crypto'},
		amount: {type: Number},
	}],
	balance: {type: Number, required: true, default: 5000}
});


let transactionSchema = new Schema({
	currencyID: {type: Schema.Types.ObjectId, ref: 'Crypto'},
	userID: {type: Schema.Types.ObjectId, ref: 'User'},
	transactionAt: {type: Date},
	amount: {type: Number}
});


let sessionSchema = new Schema({
	userID: {type: Schema.Types.ObjectId, ref: 'User'},
	sessionToken: {type: String}
});



mongoose.connect('mongodb://domh.ca/monus', (error) => {
	if (error) {
		console.log(error);
	} else {
		console.log('Database connection successful');
	}
});

module.exports = {
	Crypto: mongoose.model('Crypto', cryptoSchema),
	User: mongoose.model('User', userSchema),
	Transaction: mongoose.model('Transaction', transactionSchema),
	Session: mongoose.model('Session', sessionSchema)
};