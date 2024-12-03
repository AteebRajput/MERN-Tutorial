const express = require("express");
const router = express.Router();
const {
    getWorkouts,
    postWorkout,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController');

// GET all the workouts
router.get('/', getWorkouts); // Pass the function reference

// GET a single workout
router.get('/:id', getWorkout);

// POST a workout
router.post('/', postWorkout); // Pass the function reference

// DELETE a workout
router.delete('/:id', deleteWorkout);

// UPDATE a workout
router.patch('/:id', updateWorkout);

module.exports = router;
