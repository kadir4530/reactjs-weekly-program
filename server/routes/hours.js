const express = require('express');
const router = express.Router();
const { getHours, addUserId, removeUserId, createHour } = require('../controllers/hours')

//CRUD
router.get('/', getHours);
router.post('/', createHour);
// router.post('/:id/users', addUserId);
// router.delete('/:id/users', removeUserId);

module.exports = router;