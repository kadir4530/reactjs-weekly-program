const Program = require('../models/program');
const Day = require('../models/days')
const Hour = require('../models/hours')

// Create a template for a new user
const createTemplate = async (userId) => {
    try {
        const days = await Day.find();
        const hours = await Hour.find();

        const program = new Program({ userId })
        let daysTemplate = []
        let hoursTemplate = []
        days.map((day) => {

            hours.map((hour) => {
                hoursTemplate.push({ _id: hour._id, name: hour.name, activity: {} })
            })
            daysTemplate.push({ _id: day._id, name: day.name, hour: hours })
        })

        program.days = daysTemplate;

        const result = await Program.create(program);

        return result;
    } catch (error) {
        return new Error(error.message);
    }
}

const removeFromProgramDeletedActivities = async (userId, activityId) => {
    try {
        await Program.updateMany(
            { 'userId': userId, },
            { $set: { "days.$[day].hour.$[hour].activity": { _id: '', name: '' } } },
            { arrayFilters: [{ "day._id": { "$exists": true } }, { "hour.activity._id": activityId }] }
        )
    }
    catch (error) {
        console.log(error)
    }
}

const editProgramActivity = async (userId, newActivity) => {
    try {
        await Program.updateMany(
            { 'userId': userId, },
            { $set: { "days.$[day].hour.$[hour].activity": { _id: newActivity._id, name: newActivity.name } } },
            { arrayFilters: [{ "day._id": { "$exists": true } }, { "hour.activity._id": newActivity._id }] }
        )

    } catch (error) {
        console.log(error)
    }
}

module.exports = { createTemplate, removeFromProgramDeletedActivities, editProgramActivity }

