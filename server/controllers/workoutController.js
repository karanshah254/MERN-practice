const Workout = require('../models/Workout.js');


// Get all workouts
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({ createdAt: -1 });
        res.status(200).json(workouts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get single workout
const singleWorkout = async (req, res) => {
    const { id } = req.params;
    try {
        const workout = await Workout.findById(id);
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Post/Add/Create a workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title');
    }
    if (!reps) {
        emptyFields.push('reps');
    }
    if (!load) {
        emptyFields.push('load');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: `Please fill in the following fields: ${emptyFields.join(', ')}`, emptyFields });
    }

    // add workout to database
    try {
        const workout = await Workout.create({ title, reps, load });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    try {
        const workout = await Workout.findOneAndDelete({ _id: id });
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.status(200).json({ message: 'Workout deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    try {
        const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.status(200).json({ message: 'Workout updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createWorkout, getWorkouts, singleWorkout, deleteWorkout, updateWorkout }