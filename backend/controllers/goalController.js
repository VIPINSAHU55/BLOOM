const Goal = require('../models/goalModel');

// Get all goals for a user
exports.getGoals = async (req, res) => {
    try {
        const { userId } = req.body;
        const goals = await Goal.find({ userId });
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching goals', error });
    }
};

// Add a new goal
exports.addGoal = async (req, res) => {
    try {
        const { userId, name, targetAmount, savedAmount, bankAccount, targetDate, category } = req.body;
        
        if (!targetDate || !category) {
            return res.status(400).json({ message: 'Target date and category are required' });
        }

        const newGoal = new Goal({ userId, name, targetAmount, savedAmount, bankAccount, targetDate, category });
        await newGoal.save();
        res.status(201).json(newGoal);
    } catch (error) {
        res.status(500).json({ message: 'Error adding goal', error });
    }
};

// Update goal progress and status
exports.updateGoal = async (req, res) => {
    try {
        const { goalId, name, targetAmount, savedAmount, status, targetDate, category } = req.body; 

        const updateFields = {};
        if (name) updateFields.name = name;
        if (targetAmount !== undefined) updateFields.targetAmount = targetAmount;
        if (savedAmount !== undefined) updateFields.savedAmount = savedAmount;
        if (status) updateFields.status = status; 
        if (targetDate) updateFields.targetDate = targetDate; // Allow updating target date
        if (category) updateFields.category = category; // Allow updating category

        const goal = await Goal.findByIdAndUpdate(goalId, updateFields, { new: true });

        if (!goal) return res.status(404).json({ message: 'Goal not found' });

        res.status(200).json(goal);
    } catch (error) {
        res.status(500).json({ message: 'Error updating goal', error });
    }
};

// Delete a goal
exports.deleteGoal = async (req, res) => {
    try {
        const { goalId } = req.params;
        const deletedGoal = await Goal.findByIdAndDelete(goalId);

        if (!deletedGoal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting goal', error });
    }
};
