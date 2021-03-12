const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors())

app.get('/ping', (req, res) => {
    res.json({ message: 'Ping is OK' })
})

const userRoute = require('./routes/user')
const activityRoute = require('./routes/activities')
const dayRoute = require('./routes/days')
const hourRoute = require('./routes/hours')
const programRoute = require('./routes/program')

app.use('/users', userRoute);
app.use('/activities', activityRoute);
app.use('/days', dayRoute);
app.use('/hours', hourRoute);
app.use('/program', programRoute);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected Mongo DB'))
    .catch(err => console.log(err))

mongoose.set('useFindAndModify', false);

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
})
