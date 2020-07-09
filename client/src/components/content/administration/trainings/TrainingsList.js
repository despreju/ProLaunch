import React, {useEffect, useState} from 'react'
import API from "../../../../utils/API.js";
import './TrainingsList.css';
import NewTraining from './NewTraining.js';
import TrainingItem from './TrainingItem.js';

const TrainingsList = (props) => {

    const [data, setData] = useState([]);
    const [dataToLoad, setDataToLoad] = useState([]);
    const [displayNewTraining, setDisplayNewTraining] = useState(false);
    const [displayTraining, setDisplayTraining] = useState();
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    
    //Handle
    const handleSetDisplayTraining = (training) => {
        setDisplayTraining(true);
        setDataToLoad(training);
        console.log("chapters", training.chapters);
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
        setDisplayNewTraining();
    }

    return (                       
        <div className='list trainingsList'>  
        {displayNewTraining && <NewTraining update={updateData} back={setDisplayNewTraining} data={[]}/>}
        {displayTraining && <NewTraining update={updateData} back={() => setDisplayTraining(false)} data={dataToLoad.chapters}/>}                              
            <ul> 
                {props.user === "admin" && 
                <li key="1" className='addTraining' onClick={setDisplayNewTraining}>
                    <i className="fas fa-plus"></i>
                    Ajouter un entrainement
                </li>}              
                {data.map((training) =>                     
                    <TrainingItem key={training.id} name={training.name} data={training} onClick={() => handleSetDisplayTraining(training)}/>)          
                }
            </ul>
        </div>
    )
}

export default TrainingsList