const Activity = require('../models/activities')

const getActivities = async (req, res) => {
    try {

        const userId = req?.userId;

        if (!userId) return res.status(400).json('User not found')

        const activities = await Activity.find({ userId });

        res.status(200).json(activities)
    } catch (error) {
        res.status(400).json(error)
    }
}

const createActivity = async (req, res) => {
    try {
        const userId = req?.userId;

        const { name } = req.body;

        todo: 'Validation'

        if (!userId) return res.status(400).json('User not found')

        const result = await Activity.create({ name, userId });

        return res.status(200).json(result)

    } catch (error) {
        res.status(400).json(error)
    }

}

const updateActivity = async (req, res) => {
    try {
        const _id = req.params.id;

        const { name } = req.body;
 
        const existingActivity = await Activity.findById(_id);

        if (!existingActivity) return res.status(400).json('Activity not found')

        const updatedActivity = await Activity.findByIdAndUpdate(_id, { name }, { new: true })

        return res.status(200).json(updatedActivity)

    } catch (error) {
        return res.status(400).json(error)

    }

}

const deleteActivity = async (req, res) => {
    try {
        const _id = req.params.id;

        const existingActivity = await Activity.findById(_id);

        if (!existingActivity) return res.status(400).json('Activity not found')

        await Activity.findByIdAndRemove(_id);

        return res.status(200).json('Activity deleted successfully')

    } catch (error) {
        return res.status(400).json(error)

    }
}

const changeActive = async (req, res) => {
    try {
        const _id = req.params.id;

        const existingActivity = await Activity.findById(_id);

        if (!existingActivity) return res.status(400).json('Activity not found')

        const updatedActivity = await Activity.findByIdAndUpdate(_id, { isActive: !existingActivity.isActive })

        return res.status(200).json('Updated')

    } catch (error) {

        return res.status(400).json(error)
    }
}

module.exports = { getActivities, createActivity, updateActivity, deleteActivity, changeActive }