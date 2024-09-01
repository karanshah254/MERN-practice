const express = require('express');
const dotenv = require('dotenv');
const workoutRoutes = require('./routes/workout.js')
const mongoose = require('mongoose');
const colors = require('colors');


// express app
const app = express();
dotenv.config();
port = process.env.PORT || 4000;
app.use(express.json());


// connect to mongodb
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI, {}).then(() => {
    console.log('Connected to MongoDB!!'.bgGreen.underline.bold);
}).catch((error) => {
    console.log(error)
});


app.use((req, res, next) => {
    // console.log(req.path, req.method);
    next();
})


//routes
app.use('/api/workouts', workoutRoutes);


// listen for requests
app.listen(port, () => {
    console.log(`Server is running on port ${port}!!`.bgBlue.bold);
});