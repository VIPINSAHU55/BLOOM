const express = require('express');
const { getDebts, addDebt, updateDebt, deleteDebt } = require('../controllers/debtController');

const router = express.Router();

router.post('/get-debts', getDebts);
router.post('/add-debt', addDebt);
router.put('/update-debt', updateDebt);
router.delete('/delete-debt/:debtId', deleteDebt);

module.exports = router;