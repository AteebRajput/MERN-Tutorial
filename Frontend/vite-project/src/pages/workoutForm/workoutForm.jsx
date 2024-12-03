import { useState } from "react";
import { useWorkoutContext } from "../../hooks/UseWorkoutContext";

function WorkoutForm() {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const {dispatch} = useWorkoutContext()
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate input fields
    if (!title || !load || !reps) {
      setError("All fields are required!");
      return;
    }

    const workout = { title, load: Number(load), reps: Number(reps) };

    try {
        const response = await fetch("http://localhost:4000/api/workouts", {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
              "Content-Type": "application/json",
            },
          });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error || "An error occurred");
      } else {
        // Clear form fields and errors on success
        setTitle("");
        setLoad("");
        setReps("");
        setError(null);
        console.log("Workout Added:", json);
        dispatch({type:"CREATE_WORKOUT",payload:json})
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again.");
    }
  };

  return (
    <form className="workout-form" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise:</label>
      <input
        type="text"
        placeholder="e.g., Push Ups"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Load (Kg):</label>
      <input
        type="number"
        placeholder="e.g., 50"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label>Reps:</label>
      <input
        type="number"
        placeholder="e.g., 12"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <button type="submit">Submit</button>

      {/* Display error message */}
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default WorkoutForm;
