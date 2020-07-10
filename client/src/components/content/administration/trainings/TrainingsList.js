import React, {useEffect, useState} from 'react'
import API from "../../../../utils/API.js";
import './TrainingsList.css';
import NewTraining from './NewTraining.js';
import TrainingItem from './TrainingItem.js';

const TrainingsList = (props) => {

    const [data, setData] = useState([]);
    const [dataToLoad, setDataToLoad] = useState([]);
    const [displayTraining, setDisplayTraining] = useState();
    
    //Handle
    const handleSetDisplayTraining = (obj) => {
        setDisplayTraining(true);
        (obj.length === 0) ? setDataToLoad(obj): setDataToLoad(obj.chapters);
    }  

    useEffect(() => {
        const fetchData = async () => {
            const result = await API.getAllTrainings();
            setData(result.data);
        };
        fetchData();
        console.log('rechargement training list');
    }, []);

    const updateData = (obj) => {  
        let temp = [];
        temp = temp.concat(data);
        temp.push(obj);
        setData(temp);
        setDisplayTraining();
    }

    return (                       
        <div className='list trainingsList'>  
        {displayTraining && <NewTraining update={updateData} back={setDisplayTraining} data={dataToLoad}/>}                              
            <ul> 
                {props.user === "admin" && 
                <li key="1" className='addTraining' onClick={() => handleSetDisplayTraining([])}>
                    <i className="fas fa-plus"></i>
                    Ajouter un entrainement
                </li>}              
                {data.map((training) =>       
                    <li className="item" key={training.id} onClick={() => handleSetDisplayTraining(training)}>
                        <i className="fas fa-running"></i>
                        <div className='infos'>
                            <p className='name'>{training.name}</p>            
                        </div>
                    </li>                
                )}
            </ul>
        </div>
    )
}

export default TrainingsList