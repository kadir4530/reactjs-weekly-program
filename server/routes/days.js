const express = require('express');
const router = express.Router();
const { getDays, addUserId, removeUserId, createDay } = require('../controllers/days')
const { auth } = require('../middleware/auth')


//CRUD
router.get('/', getDays);
router.post('/', createDay);
router.post('/:id/users',auth, addUserId);
router.delete('/:id/users',auth, removeUserId);

module.exports = router;