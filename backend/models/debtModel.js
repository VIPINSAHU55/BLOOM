const mongoose = require("mongoose");

const debtSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    debtName: {
        type: String,
        required: true,
    },
    lender: {
        type: String,
        required: true,
    },
    debtType: {
        type: String,
        enum: ["Loan", "Mortgage", "Credit Card"],
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    remainingBalance: {
        type: Number,
        required: true,
    },
    account: {
        type: String,
        required: true,
    },
    amountPaid: {
        type: Number,
        default: 0,
    },
    percentagePaid: {
        type: Number,
        default: 0,
    },
    interestRate: {
        type: Number,
        required: true,
    },
    lastPaybackDate: {
        type: Date,
        required: true,
    },
    minimumPayment: {
        type: Number,
        required: true,
    },
    nextPaymentDue: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

const Debt = mongoose.model("Debt", debtSchema);

module.exports = Debt;
