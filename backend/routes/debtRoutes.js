const express = require("express");
const { getDebts, addDebt, editDebt, deleteDebt } = require("../controllers/debtController");

const router = express.Router();

router.post("/get-debts", getDebts);
router.post("/add-debt", addDebt);
router.post("/edit-debt", editDebt);
router.post("/delete-debt", deleteDebt);

module.exports = router;
