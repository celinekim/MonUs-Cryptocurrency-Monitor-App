var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cryptoSchema = new Schema({
    name: {type: String, required: true, unique: true },
    symbol: {type: String, required: true, unique: true }
})

export const Crypto = mongoose.model('Crypto', cryptoSchema);

var userSchema = new Schema({
    username: {type: String, required: true, unique: true },
    password: {type: String, required: true},
    userFirstName: String,
    userLastName: String,
    userEmail: String,
    createdAt: Date,
    followingCurrencies: [{type: Schema.Types.ObjectId, ref: 'Crypto'}], // Array of cryptoID of following currencies,
    wallet: [{
        currencyID: {type: Schema.Types.ObjectId, ref: 'Crypto'},
        amount: Number,
    }],
    balance: {type: Number, required: true, default: 5000 }
});

export const User = mongoose.model('User', userSchema);

var transactionSchema = new Schema({
    currencyID: {type: Schema.Types.ObjectId, ref: 'Crypto'},
    userID: {type: Schema.Types.ObjectId, ref: 'User'},
    transactionAt: Date,
    transactionType: String,
    currencyAmount: Number
});

export const Transaction = mongoose.model('Transaction', transactionSchema);