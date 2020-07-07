import React, {useEffect, useState} from 'react'
import API from "../../../../utils/API.js";
import './TrainingsList.css';
import NewTraining from './NewTraining.js';
import TrainingItem from './TrainingItem.js';

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
        setDisplayNewTraining();
    }

    return (                       
        <div className='list trainingsList'>  
        {displayNewTraining && <NewTraining update={updateData} back={setDisplayNewTraining}/>}                                    
            <ul> 
                {props.user === "admin" && <li key={1} className='addTraining' onClick={setDisplayNewTraining}>
                    <i className="fas fa-plus"></i>
                    Ajouter un entrainement
                </li>}              
                {data.map((training) =>                     
                    <TrainingItem key={training.id} name={training.name}/>)          
                }
            </ul>
        </div>
    )
}

export default TrainingsList