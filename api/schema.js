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
	sessionToken: {type: String},
	followingCurrencies: [{type: Schema.Types.ObjectId, ref: 'Crypto'}], // Array of cryptoID of following currencies,
	wallet: [{
		currencyID: {type: Schema.Types.ObjectId, ref: 'Crypto'},
		amount: {type: Number},
	}],
	balance: {type: Number, required: true, default: 5000},
	transactions: [{
		currencyID: {type: Schema.Types.ObjectId, ref: 'Crypto'},
		timestamp: {type: Date},
		amount: {type: Number},
		unitPrice: {type: Number}
	}]
});


mongoose.connect('mongodb://localhost/csc309', (error) => {
	if (error) {
		console.log(error);
	} else {
		console.log('Database connection successful');
	}
});

module.exports = {
	Crypto: mongoose.model('Crypto', cryptoSchema),
	User: mongoose.model('User', userSchema),
};