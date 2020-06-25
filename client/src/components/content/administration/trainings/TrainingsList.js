import React, {Fragment, useEffect, useState} from 'react'
import API from "../../../../utils/API.js";
import './TrainingsList.css';
/* import NewExercise from './NewExercise.js'; */

const TrainingsList = (props) => {

    const [data, setData] = useState([]);
/*     const [displayNewExercise, setDisplayNewExercise] = useState(false); */

    useEffect(() => {
        const fetchData = async () => {
            const result = await API.getAllTrainings();
            setData(result.data);
        };
        fetchData();
    }, []);

/*     const handleSetDisplayNewExercise = () => {
        setDisplayNewExercise(!displayNewExercise);
    } */

    const updateData = (obj) => {  
        const p = {data}.data.push(obj);  
        const u = {data};
        setData(data); 
/*         handleSetDisplayNewExercise(); */
    }

    return (                       
        <div className='list trainingsList'>  
            {/* {displayNewExercise ?  
                <NewExercise update={updateData}/> :  
                <div className="button addTraininge" onClick={handleSetDisplayNewExercise}>
                    <i className="fas fa-plus">
                        </i> Ajouter un exercice
                </div> 
            }    */}        
            <ul>    
                {data.map((training) =>                     
                    <li key={training.id}>
                        <i className="fas fa-dumbbell"></i>
                        <div className='infos'>
                            <p className='name'>{training.name}</p>
                            <p className='exercice'>{training.exercice.name}</p>
                        </div>
                    </li>)
                }
            </ul>
        </div>
    )
}

export default TrainingsList