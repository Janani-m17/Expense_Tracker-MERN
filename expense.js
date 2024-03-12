const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Expense = new Schema({
    name:String,
    description:String,
    date:Date,
    amount:Number
})

const expense = mongoose.model('expense',Expense)
module.exports = expense