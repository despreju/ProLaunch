import React, {useEffect, useState} from 'react'
import API from "../../../../utils/API.js";
import './TrainingsList.css';
import TrainingItem from './TrainingItem.js';

const TrainingsList = (props) => {

    const [data, setData] = useState([]);
    const [dataName, setDataName] = useState();
    const [dataToLoad, setDataToLoad] = useState([]);
    const [displayTraining, setDisplayTraining] = useState();
    const [displayNewTraining, setDisplayNewTraining] = useState();

    //Handle
    const handleSetDisplayTraining = (obj) => {
        setDisplayTraining(true);       
        setDataToLoad(obj.chapters);
        setDataName(obj.name);
    }  

    //Handle
    const handleSetDisplayNewTraining = () => {
        setDisplayNewTraining(true);
        setDataToLoad([]);
        setDataName(""); 
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
        setDisplayTraining(false);
        setDisplayNewTraining(false);
    }

    return (                       
        <div className='list trainingsList'>  
            {displayTraining && <TrainingItem update={updateData} back={setDisplayTraining} data={dataToLoad} trainingName={dataName} isEditMode={false} />}                              
            {displayNewTraining && <TrainingItem update={updateData} back={setDisplayNewTraining} data={dataToLoad} trainingName={dataName} isEditMode={true} />}                              
            <ul> 
                {props.user === "admin" && 
                <li key="1" className='addTraining' onClick={() => handleSetDisplayNewTraining()}>
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