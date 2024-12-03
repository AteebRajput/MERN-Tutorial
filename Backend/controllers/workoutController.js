const Workout = require('../Models/WorkoutModel')
const mongoose = require('mongoose')
// get all workouts

const getWorkouts = async (req,res) =>{
    const workout = await Workout.find({}).sort({createdAt:-1})
    res.status(200).json(workout)

}

// get single workout

const getWorkout = async (req, res) =>{
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'Invalid id'})
    }
    const workout = await Workout.findById(id)
    if(!workout){
        res.status(404).json({message: 'Workout not found'})
    }
    res.status(200).json(workout)
}

// Post a workout

const postWorkout = async (req,res) =>{
    const {title , load ,reps} = req.body
    try {
        const workout = await Workout.create({title,load,reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

// Delete a Workout

const deleteWorkout = async (req,res) =>{
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'Invalid id'})
    }
    const workout = await Workout.findByIdAndDelete({_id:id})
    if(!workout){
        res.status(404).json({message: 'Workout not found'})
    }
    res.status(200).json({message : `Workout Deleted`})
}

// Update a Workout
const updateWorkout = async(req,res) =>{
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'Invalid id'})
        }
        const {title,load,reps} = req.body
        const workout = await Workout.findByIdAndUpdate(id,{title,load,reps},{new:true
            })
            if(!workout){
                res.status(404).json({message: 'Workout not found'})
                }
                res.status(200).json(workout)
}
module.exports = {
    getWorkouts,
    postWorkout,
    getWorkout,
    deleteWorkout,
    updateWorkout,

}