const Day = require('../models/days')

const getDays = async (req, res) => {
    try {
        const userId = req?.userId;
        const days = await Day.find({ userId });

        res.status(200).json(days)
    } catch (error) {
        res.status(400).json(error)
    }
}

const addUserId = async (req, res) => {
    try {
        const _id = req.params.id;

        const userId = req?.userId;

        const existingDay = await Day.findById(_id);

        if (!existingDay) return res.status(400).json('Day not found')

        const updatedDay = await Day.findByIdAndUpdate(_id, {
            $addToSet: {
                userId: [userId]
            }
        })

        return res.status(200).json('Updated')

    } catch (error) { 
        return res.status(400).json(error)
    }

}

const removeUserId = async (req, res) => {
    try {
        const _id = req.params.id;

        const userId = req?.userId;

        const existingDay = await Day.findById(_id);

        if (!existingDay) return res.status(400).json('Day not found')

        const updatedDay = await Day.findByIdAndUpdate(_id, {
            $pull: {
                userId: { $in: [userId] }
            }
        })

        return res.status(200).json('Updated')

    } catch (error) {
        return res.status(400).json(error)

    }
}


const createDay = async (req, res) => {
    try {
        const userId = req?.userId;

        const { name } = req.body;

        todo: 'Validation'

        const existingDay = await Day.findOne({ name })

        if (existingDay) return res.status(400).json('Day is already exist')

        const result = await Day.create({ name, userId });

        return res.status(200).json(result)

    } catch (error) {
        res.status(400).json(error)
    }

}


module.exports = { getDays, addUserId, removeUserId, createDay }