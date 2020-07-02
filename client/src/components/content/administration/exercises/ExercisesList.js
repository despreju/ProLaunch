import React, {useEffect, useState} from 'react'
import API from "../../../../utils/API.js";
import './ExercisesList.css';
import NewExercise from './NewExercise.js';
import ExerciseItem from './ExerciseItem.js';

const ExercisesList = () => {

    const [data, setData] = useState([]);
    const [displayNewExercise, setDisplayNewExercise] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await API.getAllExercises();
            setData(result.data);
        };
        fetchData();
    }, []);   

    const updateData = (obj) => {  
        data.push(obj);  
        setData([]);
        setData(data);     
        setDisplayNewExercise();    
    }

    return (                       
        <div className='list exercisesList'>    
            {displayNewExercise && <NewExercise update={updateData} back={setDisplayNewExercise}/>}                     
            <ul>
                <li key={1} className='addExercise' onClick={setDisplayNewExercise}>        
                    <i className="fas fa-plus"></i>
                    Ajouter un exercice
                </li>
                {data.map((exercise) =>    
                    <ExerciseItem key={exercise.id} name={exercise.name} difficulty={exercise.difficulty}/>)          
                }
            </ul>
        </div>
    )
}

export default ExercisesList