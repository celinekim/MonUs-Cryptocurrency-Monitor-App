let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
	username: {type: String, required: true, unique: true },
	password: {type: String, required: true},
	firstName: {type: String},
	lastName: {type: String},
	email: {type: String},
	createdAt: {type: Date},
	sessionToken: {type: String},
	followingCurrencies: [{type: Schema.Types.ObjectId, ref: 'Crypto'}], // Array of cryptoID of following currencies,
	wallet: {
		USD: {type: Number, default: 50000},
		BTC: {type: Number, default: 0},
		ETH: {type: Number, default: 0},
		LTC: {type: Number, default: 0},
		XRP: {type: Number, default: 0},
		BCH: {type: Number, default: 0},
		EOS: {type: Number, default: 0},
		XEM: {type: Number, default: 0},
		NEO: {type: Number, default: 0},
		XLM: {type: Number, default: 0},
		ADA: {type: Number, default: 0}
	},
	transactions: [{
		currencyID: {type: Schema.Types.ObjectId, ref: 'Crypto'},
		timestamp: {type: Date},
		amount: {type: Number},
		unitPrice: {type: Number}
	}]
});


mongoose.connect('mongodb://domh.ca/monus', (error) => {
	if (error) {
		console.log(error);
	} else {
		console.log('Database connection successful');
	}
});

module.exports = mongoose.model('User', userSchema);
