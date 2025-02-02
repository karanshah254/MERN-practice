import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext();

    const handleClick = async (e) => {
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
        })
        const data = await response.json()

        if (response.ok) {
            // console.log('workout deleted:', data)
            dispatch({ type: 'DELETE_WORKOUT', payload: data })
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Number of reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className='material-symbols-outlined' onClick={handleClick}>Delete</span>
        </div>
    )
}

export default WorkoutDetails
