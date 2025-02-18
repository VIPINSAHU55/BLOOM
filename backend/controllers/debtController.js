const Debt = require('../models/debtModel');

exports.getDebts = async (req, res) => {
  try {
    const { userId } = req.body;
    const debts = await Debt.find({ userId });
    res.status(200).json(debts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching debts', error });
  }
};

exports.addDebt = async (req, res) => {
  try {
    const newDebt = new Debt(req.body);
    await newDebt.save();
    res.status(201).json(newDebt);
  } catch (error) {
    res.status(500).json({ message: 'Error adding debt', error });
  }
};

exports.updateDebt = async (req, res) => {
  try {
    const { debtId, ...updates } = req.body;
    const updatedDebt = await Debt.findByIdAndUpdate(debtId, updates, { new: true });
    res.status(200).json(updatedDebt);
  } catch (error) {
    res.status(500).json({ message: 'Error updating debt', error });
  }
};

exports.deleteDebt = async (req, res) => {
  try {
    const { debtId } = req.params;
    await Debt.findByIdAndDelete(debtId);
    res.status(200).json({ message: 'Debt deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting debt', error });
  }
};