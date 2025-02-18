const mongoose = require('mongoose');

const debtSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  paidAmount: { type: Number, default: 0 },
  dueDate: { type: Date, required: true },
  category: { type: String, enum: ['Loan', 'Credit Card', 'Mortgage'], required: true },
  status: { type: String, enum: ['Ongoing', 'Completed'], default: 'Ongoing' },
}, { timestamps: true });

module.exports = mongoose.model('Debt', debtSchema);