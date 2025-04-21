const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    savedAmount: { type: Number, default: 0 },
    bankAccount: { type: String },
    targetDate: { type: Date, required: true }, 
    category: { type: String, enum: ['Savings', 'Expense', 'Investment'], required: true },
    status: { type: String, enum: ['Ongoing', 'Completed'], default: 'Ongoing' },
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);
