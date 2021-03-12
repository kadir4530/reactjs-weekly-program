const express = require('express');
const router = express.Router();
const { getPrograms, setActivity } = require('../controllers/program')
const { auth } = require('../middleware/auth')


router.get('/', auth, getPrograms);
router.post('/', auth, setActivity);


module.exports = router;