import React, {Fragment, useEffect, useState} from 'react'
import API from "../../../../utils/API.js";
import './ExercisesList.css';
import NewExercise from './NewExercise.js';
import ExerciseItem from './ExerciseItem.js';

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
        setDisplayNewExercise(!displayNewExercise);
    }

    const updateData = (obj) => {  
        const p = {data}.data.push(obj);  
        const u = {data};
        setData(data); 
        handleSetDisplayNewExercise();
    }

    return (                       
        <div className='list exercisesList'>  
            {displayNewExercise &&
                <NewExercise update={updateData}/>
            }           
            <ul>
                {!displayNewExercise && 
                    <li key={1} className='addExercise' onClick={handleSetDisplayNewExercise}>
                        <i className="fas fa-plus"></i>
                        Ajouter un exercice
                    </li>}    
                {data.map((exercise) =>    
                    <ExerciseItem key={exercise.id} name={exercise.name} difficulty={exercise.difficulty}/>)          
                }
            </ul>
        </div>
    )
}

export default ExercisesList