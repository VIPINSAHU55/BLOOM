const express = require("express");
const {
    getSubscriptions,
    addSubscription,
    updateSubscription,
    deleteSubscription
} = require("../controllers/subscriptionController");

const router = express.Router();

router.post("/get-subscriptions", getSubscriptions);
router.post("/add-subscription", addSubscription);
router.put('/update-subscription/:subscriptionId', updateSubscription);
router.post("/delete-subscription", deleteSubscription);

module.exports = router;
