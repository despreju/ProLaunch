import React, {useEffect, useState} from 'react'
import API from "../../../../utils/API.js";
import './TrainingsList.css';
import TrainingItem from './TrainingItem.js';

const TrainingsList = (props) => {

    const [data, setData] = useState([]);
    const [dataName, setDataName] = useState();
    const [dataId, setDataId] = useState("");
    const [dataToLoad, setDataToLoad] = useState([]);
    const [displayTraining, setDisplayTraining] = useState();
    const [displayNewTraining, setDisplayNewTraining] = useState();
    const [forceUpdate, setForceUpdate] = useState(false);

    //Handle
    const handleSetDisplayTraining = (obj) => {
        setDisplayTraining(true);       
        setDataToLoad(obj.chapters);
        setDataName(obj.name);
        setDataId(obj._id);
    }  

    //Handle
    const handleSetDisplayNewTraining = () => {
        setDisplayNewTraining(true);
        setDataToLoad([]);
        setDataName(""); 
        setDataId("");
    }  

    useEffect(() => {
        const fetchData = async () => {
            const result = await API.getAllTrainings();
            setData(result.data);
        };
        fetchData();
        
    }, [forceUpdate]);

    const updateData = () => {  
        setForceUpdate(!forceUpdate);
        setDisplayTraining(false);
        setDisplayNewTraining(false);        
    }

    return (                       
        <div className='list trainingsList'>  
            {displayTraining && <TrainingItem level={props.user} update={updateData} back={setDisplayTraining} data={dataToLoad} trainingName={dataName} trainingId={dataId} isEditMode={false} />}                              
            {displayNewTraining && <TrainingItem update={updateData} back={setDisplayNewTraining} data={dataToLoad} trainingName={dataName} trainingId={dataId} isEditMode={true} />}                              
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