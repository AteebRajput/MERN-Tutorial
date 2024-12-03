import { useEffect} from "react";
import WorkoutDetail from "../workoutDetail/WorkoutDetail";
import WorkoutForm from "../workoutForm/workoutForm";
import { useWorkoutContext } from "../../hooks/UseWorkoutContext";

function Home() {
  const {workouts,dispatch} = useWorkoutContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/workouts/');
        const data = await response.json();
        if (response.ok) {
          dispatch({type:"SET_WORKOUTS",payload:data})
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };
    fetchWorkouts();
  }, []);

  return (
    <div className="home">
      <div className="workout">
        {workouts && workouts.map((item) => (
          <WorkoutDetail key={item._id} workout={item} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
