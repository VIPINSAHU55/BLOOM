const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    billingCycle: { type: String, enum: ["Monthly", "Quarterly", "Annual"], required: true },
    cost: { type: Number, required: true },
    nextRenewal: { type: Date, required: true },
    yearlyCost: { type: Number, required: true },
    dueStatus: { type: String, enum: ["Paid", "Overdue"], required: true },
}, { timestamps: true });

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;
