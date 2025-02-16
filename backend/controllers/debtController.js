const Debt = require("../models/debtModel");

// Get all debts for a user
const getDebts = async (req, res) => {
    try {
        const { userId } = req.body;
        const debts = await Debt.find({ userId });
        res.json(debts);
    } catch (error) {
        console.error("Error fetching debts:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Add a new debt
const addDebt = async (req, res) => {
    try {
        const { userId, debtName, lender, debtType, totalAmount, remainingBalance, account, amountPaid, interestRate, lastPaybackDate, minimumPayment, nextPaymentDue } = req.body;
        
        const percentagePaid = (amountPaid / totalAmount) * 100;

        const newDebt = new Debt({
            userId,
            debtName,
            lender,
            debtType,
            totalAmount,
            remainingBalance,
            account,
            amountPaid,
            percentagePaid,
            interestRate,
            lastPaybackDate,
            minimumPayment,
            nextPaymentDue,
        });

        await newDebt.save();
        res.status(201).json({ message: "Debt added successfully", debt: newDebt });
    } catch (error) {
        console.error("Error adding debt:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Edit a debt
const editDebt = async (req, res) => {
    try {
        const { debtId, updatedData } = req.body;
        const updatedDebt = await Debt.findByIdAndUpdate(debtId, updatedData, { new: true });

        if (!updatedDebt) {
            return res.status(404).json({ message: "Debt not found" });
        }

        res.json({ message: "Debt updated successfully", debt: updatedDebt });
    } catch (error) {
        console.error("Error updating debt:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete a debt
const deleteDebt = async (req, res) => {
    try {
        const { debtId } = req.body;
        await Debt.findByIdAndDelete(debtId);
        res.json({ message: "Debt deleted successfully" });
    } catch (error) {
        console.error("Error deleting debt:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getDebts, addDebt, editDebt, deleteDebt };
