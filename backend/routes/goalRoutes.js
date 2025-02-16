const express = require('express');
const { getGoals, addGoal, updateGoal, deleteGoal } = require('../controllers/goalController');

const router = express.Router();

router.post('/get-goals', getGoals);
router.post('/add-goal', addGoal);
router.put('/update-goal', updateGoal);
router.delete('/delete-goal/:goalId', deleteGoal);


module.exports = router;
