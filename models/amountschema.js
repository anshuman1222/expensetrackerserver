const mongoose = require('mongoose');

const amountschema = new mongoose.Schema({
    status:{
        type:String,
        required:true
    },
    cost: {
        type: Number,
        required: true
    },
    category:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    }
}, { timestamps: true });

const Expense = mongoose.model('EXPENSE', amountschema);

module.exports = Expense;