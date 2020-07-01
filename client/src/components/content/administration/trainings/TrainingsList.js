import React, {useEffect, useState} from 'react'
import API from "../../../../utils/API.js";
import './TrainingsList.css';
import NewTraining from './NewTraining.js';
import TrainingItem from './TrainingItem.js';

const TrainingsList = (props) => {

    const [data, setData] = useState([]);

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
                    <TrainingItem key={training.id} name={training.name} exercises={training.exercises} />)          
                }
            </ul>
        </div>
    )
}

export default TrainingsList