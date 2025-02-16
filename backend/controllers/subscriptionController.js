const Subscription = require("../models/subscriptionModel");

// Get all subscriptions for a user
exports.getSubscriptions = async (req, res) => {
    try {
        const { userId } = req.body;
        const subscriptions = await Subscription.find({ userId });
        res.json(subscriptions);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch subscriptions", error });
    }
};

// Add a new subscription
exports.addSubscription = async (req, res) => {
    try {
        const { userId, name, billingCycle, cost, nextRenewal, dueStatus } = req.body;

        // Calculate yearly cost
        let yearlyCost = cost;
        if (billingCycle === "Monthly") yearlyCost *= 12;
        else if (billingCycle === "Quarterly") yearlyCost *= 4;

        const newSubscription = new Subscription({
            userId,
            name,
            billingCycle,
            cost,
            nextRenewal,
            yearlyCost,
            dueStatus,
        });

        await newSubscription.save();
        res.json({ message: "Subscription added successfully", newSubscription });
    } catch (error) {
        res.status(500).json({ message: "Failed to add subscription", error });
    }
};

// Update subscription
exports.updateSubscription = async (req, res) => {
    try {
        const { subscriptionId } = req.params; // Get ID from params instead of body
        const { name, billingCycle, cost, nextRenewal, dueStatus } = req.body;

        if (!subscriptionId) {
            return res.status(400).json({ message: "Subscription ID is required" });
        }

        // Calculate yearly cost again
        let yearlyCost = cost;
        if (billingCycle === "Monthly") yearlyCost *= 12;
        else if (billingCycle === "Quarterly") yearlyCost *= 4;

        const updatedSubscription = await Subscription.findByIdAndUpdate(
            subscriptionId,
            { name, billingCycle, cost, nextRenewal, yearlyCost, dueStatus },
            { new: true }
        );

        if (!updatedSubscription) {
            return res.status(404).json({ message: "Subscription not found" });
        }

        res.json({ message: "Subscription updated successfully", updatedSubscription });
    } catch (error) {
        res.status(500).json({ message: "Failed to update subscription", error });
    }
};

// Delete a subscription
exports.deleteSubscription = async (req, res) => {
    try {
        const { subscriptionId } = req.body;
        await Subscription.findByIdAndDelete(subscriptionId);
        res.json({ message: "Subscription deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete subscription", error });
    }
};
