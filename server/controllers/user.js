const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const programWorker = require('../workers/programWorker')

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

// Fetch All
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)

    } catch (error) {
        return res.status(400).json(error)
    }
}
//Sign In
const signin = async (req, res) => {

    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) return res.status(404).json({ message: 'User doesnt exist' });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' })

        const token = jwt.sign({ email: existingUser.email, _id: existingUser._id }, ACCESS_TOKEN_SECRET, { expiresIn: '2h' });

        res.status(200).json({ result: existingUser, token })

    } catch (error) {

        res.status(500).json('Something went wrong')
    }
}

// Sign UP
const createUser = async (req, res) => {
    // If is it a google authentication add to Database
    try {
        if (req?.isGoogleAuth) {
            const { email, name } = req;

            const existingUser = await User.findOne({ email });

            if (existingUser) {

                const token = jwt.sign({ email: existingUser.email, _id: existingUser._id }, ACCESS_TOKEN_SECRET, { expiresIn: '2h' });

                return res.status(200).json({ result: existingUser, token })

            }

            const password = require('crypto').randomBytes(8).toString('hex');

            const hashedPassword = await bcrypt.hash(password, 12);

            const result = await User.create({ email, password: hashedPassword, name })

            const token = jwt.sign({ email: result.email, _id: result._id }, ACCESS_TOKEN_SECRET, { expiresIn: '2h' });

            // create a new program template to mongodb automatically 

            programWorker.createTemplate(result._id)

            res.status(200).json({ result, token })
        }
        else {
            const { email, password, confirmPassword, firstName, lastName } = req.body;

            const existingUser = await User.findOne({ email });

            if (existingUser) return res.status(400).json({ message: 'User is already exist' });

            if (password != confirmPassword) return res.status(400).json({ message: 'Passwords dont match' })

            const hashedPassword = await bcrypt.hash(password, 12);

            const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })

            const token = jwt.sign({ email: result.email, _id: result._id }, ACCESS_TOKEN_SECRET, { expiresIn: '2h' });

            // create a new program template to mongodb automatically 

            await programWorker.createTemplate(result._id)

            res.status(200).json({ result, token })
        }

    } catch (error) {
        res.status(400).json(error)
    }
}

//Update User
const updateUser = async (req, res) => {
    try {
        const _id = req.params.id;

        const { password, firstName, lastName } = req.body;

        const existingUser = await User.findById(_id);

        if (!existingUser) return res.status(400).json('User not found')

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json('Invalid Password')

        const updatedUser = await User.findByIdAndUpdate(_id, { name: `${firstName} ${lastName}` })

        return res.status(200).json('Updated')

    } catch (error) {

        return res.status(400).json(error)

    }
}

//Delete User
const deleteUser = async (req, res) => {
    try {
        const userId = req?.userId;

        const _id = req.params.id;

        if (userId != _id) return res.status(400).json("User id didnt match")
        const { password } = req.body;

        const existingUser = await User.findById(_id);

        if (!existingUser) return res.status(400).json('User not found')

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json('Invalid Password')

        await User.findByIdAndRemove(_id);

        return res.status(200).json('User deleted successfully')

    } catch (error) {
        return res.status(400).json(error)
    }
}
// Update Password
const updatepassword = async (req, res) => {
    try {

        const userId = req?.userId;

        const { existingPassword, newPassword, confirmPassword } = req.body;

        const existingUser = await User.findById(userId);

        if (!existingUser) return res.status(400).json('User not found')

        const isPasswordCorrect = await bcrypt.compare(existingPassword, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid Password' })

        if (newPassword !== confirmPassword) return res.status(400).json({ message: 'Passwords dont match' })

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        const updatedUser = await User.findByIdAndUpdate(userId, { password: hashedPassword })

        return res.status(200).json('Password updated successfully')

    } catch (error) {
        return res.status(400).json(error)

    }
}

module.exports = { getUsers, createUser, updateUser, deleteUser, signin, updatepassword }