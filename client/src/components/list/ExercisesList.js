import React, {useEffect, useState} from 'react'
import API from "../../utils/API.js";
import '../css/ExercisesList.css';
import NewExercise from '../NewExercise.js';
import ExerciseItem from '../item/ExerciseItem.js';
import Gauge from '../tool/Gauge.js';

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
        setForceUpdate(!forceUpdate);
        setDisplayNewExercise(false); 
        setDisplayExercise(false);   
    }

    return (                       
        <div className='list exercisesList'>    
            {displayExercise && <ExerciseItem update={updateData} back={setDisplayExercise} data={exerciseData}/>}
            {displayNewExercise && <NewExercise update={updateData} back={setDisplayNewExercise}/>}                  
            <div key="1" className='add' onClick={() => handleSetDisplayNewExercise()}>
                    <i className="fas fa-plus"></i>
                    Ajouter un exercice
            </div>
            <div className="tab">
                <div className="iconeF"></div>
                <div className="nameF">Nom</div>
                <div className="difficultyF">Difficulté</div>
                <div className="locationF">Location</div>
            </div>   
            <ul>                                
                {data.map((exercise) =>    
                    <li className="item" key={exercise.id} onClick={() => handleSetDisplayExercise(exercise)}>                    
                        <div className="icone"><i className="fas fa-dumbbell"></i></div>
                        <div className='name'>{exercise.name}</div>
                        <div className='difficulty'>
                            <Gauge level={exercise.difficulty}/>
                        </div>
                        <div className='location'>{exercise.location}</div>                               
                    </li>          
                )}
            </ul>
        </div>
    )
}

export default ExercisesList