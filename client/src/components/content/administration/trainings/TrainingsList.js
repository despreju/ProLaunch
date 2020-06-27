import React, {Fragment, useEffect, useState} from 'react'
import API from "../../../../utils/API.js";
import './TrainingsList.css';
import NewTraining from './NewTraining.js';

const TrainingsList = (props) => {

    const [data, setData] = useState([]);
    const [displayNewTraining, setDisplayNewTraining] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await API.getAllTrainings();
            setData(result.data);
        };
        fetchData();
    }, []);

    const handleSetDisplayNewTraining = () => {
        setDisplayNewTraining(!displayNewTraining);
    }

    const updateData = (obj) => {  
        const p = {data}.data.push(obj);  
        const u = {data};
        setData(data); 
        handleSetDisplayNewTraining();
    }

    return (                       
        <div className='list trainingsList'>  
            {displayNewTraining && 
                <NewTraining update={updateData}/> 
            }
            <ul> 
                {!displayNewTraining && 
                    <li key={1} className='addTraining' onClick={handleSetDisplayNewTraining}>
                        <i className="fas fa-plus"></i>
                        Ajouter un entrainement
                    </li>}     
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