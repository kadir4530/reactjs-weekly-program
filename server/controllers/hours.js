const Hour = require('../models/hours')

const getHours = async (req, res) => {
    try {
        const hours = await Hour.find();

        res.status(200).json(hours)
    } catch (error) {
        res.status(400).json(error)
    }
}


const createHour = async (req, res) => {
    try {
        const { name, userId } = req.body;

        todo: 'Validation'

        const existingHour = await Hour.findOne({ name })

        if (existingHour) return res.status(400).json('Hour is already exist')

        const result = await Hour.create({ name, userId });

        return res.status(200).json(result)

    } catch (error) {
        res.status(400).json(error)
    }

}


module.exports = { getHours, createHour }