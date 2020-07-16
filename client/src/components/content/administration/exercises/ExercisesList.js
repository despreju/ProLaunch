import React, {useEffect, useState} from 'react'
import API from "../../../../utils/API.js";
import './ExercisesList.css';
import NewExercise from './NewExercise.js';
import ExerciseItem from './ExerciseItem.js';

const ExercisesList = () => {

    const [data, setData] = useState([]);
    const [displayNewExercise, setDisplayNewExercise] = useState(false);
    const [displayExercise, setDisplayExercise] = useState(false);
    const [exerciseData, setDataToLoad] = useState([]);
    const [forceUpdate, setForceUpdate] = useState(false);

    //Handle
    const handleSetDisplayNewExercise = () => {
        setDisplayNewExercise(true);
    }  

    const handleSetDisplayExercise = (exercise) => {
        setDataToLoad(exercise);
        setDisplayExercise(true);
    } 

    useEffect(() => {
        const fetchData = async () => {
            const result = await API.getAllExercises();
            setData(result.data);
        };
        fetchData();
    }, [forceUpdate]);   

    const updateData = (obj) => {  
        data.push(obj);  
        setData([]);
        setData(data);     
        setDisplayNewExercise();    
    }

    return (                       
        <div className='list exercisesList'>    
            {displayExercise && <ExerciseItem back={setDisplayExercise} data={exerciseData}/>}
            {displayNewExercise && <NewExercise update={updateData} back={setDisplayNewExercise}/>}                     
            <ul>
                <li key="1" className='addExercise' onClick={() => handleSetDisplayNewExercise()}>
                    <i className="fas fa-plus"></i>
                    Ajouter un exercice
                </li>
                {data.map((exercise) =>    
                    <li className="item" key={exercise.id} onClick={() => handleSetDisplayExercise(exercise)}>
                    <i className="fas fa-dumbbell"></i>
                    <div className='infos'>
                        <p className='name'>{exercise.name}</p>
                        <p className='difficulty'>{exercise.difficulty}</p>
                    </div>
                </li>          
                )}
            </ul>
        </div>
    )
}

export default ExercisesList