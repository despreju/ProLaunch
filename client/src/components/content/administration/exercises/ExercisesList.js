import React, {useEffect, useState} from 'react'
import API from "../../../../utils/API.js";
import './ExercisesList.css';
import NewExercise from './NewExercise.js';
import ExerciseItem from './ExerciseItem.js';

const ExercisesList = () => {

    const [data, setData] = useState([]);

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
    }

    return (                       
        <div className='list exercisesList'>                         
            <ul>
                <NewExercise update={updateData}/>  
                {data.map((exercise) =>    
                    <ExerciseItem key={exercise.id} name={exercise.name} difficulty={exercise.difficulty}/>)          
                }
            </ul>
        </div>
    )
}

export default ExercisesList