const express = require('express');
const { getUsers, createUser, updateUser, deleteUser, signin, updatepassword } = require('../controllers/user')
const { auth } = require('../middleware/auth')
const router = express.Router();

//CRUD
router.get('/', getUsers);
router.patch('/:id', updateUser);
router.delete('/:id', auth, deleteUser)

//SIGNIN
router.post('/signin', signin)
//REGISTER
router.post('/signup', createUser);
router.post('/signup/google', auth, createUser);
//Update Password
router.post('/updatepassword/', auth, updatepassword)

module.exports = router;