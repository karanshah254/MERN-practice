import React, { useEffect } from 'react'
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';


const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch('/api/workouts')
                const data = await response.json()
                if (response.ok) {
                    dispatch({ type: 'SET_WORKOUTS', payload: data })
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchWorkouts()
    }, [dispatch]);


    return (
        <div className='home'>
            <div className="workouts">
                {
                    workouts && workouts.map(workout => (
                        <WorkoutDetails key={workout._id} workout={workout} />
                    ))
                }
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home
