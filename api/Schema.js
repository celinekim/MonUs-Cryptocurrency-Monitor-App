let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let cryptoSchema = new Schema({
	name: {type: String, required: true, unique: true },
	symbol: {type: String, required: true, unique: true }
});

export const Crypto = mongoose.model('Crypto', cryptoSchema);

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

export const User = mongoose.model('User', userSchema);

let transactionSchema = new Schema({
	currencyID: {type: Schema.Types.ObjectId, ref: 'Crypto'},
	userID: {type: Schema.Types.ObjectId, ref: 'User'},
	transactionAt: {type: Date},
	amount: {type: Number}
});

export const Transaction = mongoose.model('Transaction', transactionSchema);

let sessionSchema = new Schema({
	userID: {type: Schema.Types.ObjectId, ref: 'User'},
	sessionToken: {type: String}
});

export const Session = mongoose.model('Session', sessionSchema);