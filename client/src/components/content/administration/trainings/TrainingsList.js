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

    const updateData = (obj) => {  
        data.push(obj);  
        setData([]); 
        setData(data); 
        
    }

    return (                       
        <div className='list trainingsList'>                 
            <ul> 
                <NewTraining update={updateData}/>                
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