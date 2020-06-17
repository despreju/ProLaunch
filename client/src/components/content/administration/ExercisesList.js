import React, {Fragment, useEffect, useState} from 'react'
import API from "../../../utils/API.js";
import './ExercisesList.css';
import NewExercise from './NewExercise.js';

const ExercisesList = (props) => {

    const [data, setData] = useState([]);
    const [displayNewExercise, setDisplayNewExercise] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await API.getAllExercises();
            setData(result.data);
        };
        fetchData();
    }, []);

    const handleSetDisplayNewExercise = () => {
        setDisplayNewExercise(true);
    }  

    return (                       
        <div className='list exercisesList'>  
            {displayNewExercise ? 
                <NewExercise/> : 
                <div className="button addExercise" onClick={handleSetDisplayNewExercise}>
                    <i class="fas fa-plus">
                        </i> Ajouter un exercice
                </div>
            }           
            <ul>    
                {data.map((exercise) =>                     
                    <li key={exercise.id}>
                        <i className="fas fa-dumbbell"></i>
                        <div className='infos'>
                            <p className='name'>{exercise.name}</p>
                            <p className='difficulty'>{exercise.difficulty}</p>
                        </div>
                    </li>)
                }
            </ul>
        </div>
    )
}

export default ExercisesList