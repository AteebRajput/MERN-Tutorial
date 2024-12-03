import PropTypes from "prop-types";
import { useWorkoutContext } from "../../hooks/UseWorkoutContext";
function WorkoutDetail({ workout }) {
  const {dispatch} = useWorkoutContext()
  const handleDelete = async () => {
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: 'DELETE'
    })
    const json = await response.json()
    if (response.ok) {
      dispatch({type:"DELETE_WORKOUT",payload:json})
    }
  }
  return (
    <div className="workout-details">
      <h3>{workout.title}</h3>
      <p><strong>Load (Kg):</strong> {workout.load}</p>
      <p><strong>Reps:</strong> {workout.reps}</p>
      <p>{workout.createdAt}</p>
      <button onClick={handleDelete}>delete</button>
    </div>
  );
}

// Prop validation
WorkoutDetail.propTypes = {
  workout: PropTypes.shape({
    title: PropTypes.string.isRequired,
    load: PropTypes.number.isRequired,
    reps: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
  }).isRequired, // Ensures the `workout` prop is an object and is mandatory
};

export default WorkoutDetail;
