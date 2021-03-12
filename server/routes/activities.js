const express = require('express');
const { getActivities, createActivity, updateActivity, deleteActivity, changeActive } = require('../controllers/activities')
const { auth } = require('../middleware/auth')

const router = express.Router();

//CRUD
router.get('/', auth, getActivities);
router.post('/', auth, createActivity);
router.post('/:id', auth, updateActivity);
router.delete('/:id', auth, deleteActivity)

router.post('/isactive/:id', auth, changeActive);


module.exports = router;