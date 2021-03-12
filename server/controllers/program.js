const Program = require('../models/program')

const getPrograms = async (req, res) => {
    try {

        const userId = req?.userId; 
        if (!userId) return res.status(400).json('User not found')


        const programs = await Program.find({ userId })
        // const programs = await Program.find()


        res.json(programs);

    } catch (error) {
        res.json(error)
    }
}

const setActivity = async (req, res) => {
    try {
        const userId = req?.userId;

        const { dayId, hourId, activity } = req.body;

        if (!userId || !dayId || !hourId || !activity) return res.status(400).json('Something went wrong')

        await Program.findOneAndUpdate(
            { userId },
            { $set: { "days.$[day].hour.$[hour].activity": activity } },
            {
                arrayFilters: [{ "day._id": dayId }, { "hour._id": hourId }],
                multi: true,
            }

        )
        const updatedProgram = await Program.find({ userId });

        return res.status(200).json(updatedProgram)

    } catch (error) { 
        return res.status(400).json(error)
    }
}


module.exports = { getPrograms, setActivity }