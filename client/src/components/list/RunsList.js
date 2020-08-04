import React, {useEffect, useState, useContext} from 'react'
import API from "../../utils/API.js";
import {CredentialContext} from '../../contexts/CredentialContext.js';
import '../css/StatisticsList.css';
import StatisticItem from '../item/RunItem.js';

const RunsList = (props) => {

    const [data, setData] = useState([]);
    const [displayStatistic, setDisplayStatistic] = useState(false);
    const [statisticData, setDataToLoad] = useState([]);
    const [forceUpdate, setForceUpdate] = useState(false); 

    const {profile} = useContext(CredentialContext);

    //Handle
    const handleSetDisplayStatistic = (statistic) => {
        setDataToLoad(statistic);
        setDisplayStatistic(!displayStatistic);
    }  

    useEffect(() => {
        const fetchData = async () => {
            let result = [];
            const email = profile.email;
            (props.user !== "user") ? result = await API.getAllRuns() : result = await API.getAllRunsByUser({email});            
            setData(result.data);
        };
        fetchData();
    }, [forceUpdate]);

    const updateData = (obj) => {  
        setForceUpdate(!forceUpdate);
        setDisplayStatistic(false);   
    }

    return (     
        <div className='list statisticsList'>  
            {displayStatistic && <StatisticItem update={updateData} back={setDisplayStatistic} data={statisticData}/>}                              
            <div className="tab">
                <div className="iconeF"></div>
                <div className="nameF">Utilisateur</div>
                <div className="trainingF">Entrainement</div>
                <div className="dateF">Date</div>
            </div>   
            <ul>    
                {data.map((run) =>
                    <li className="item" key={run.id} onClick={() => handleSetDisplayStatistic(run)}>
                        <div className="icone"><i className="fas fa-chart-bar"></i></div>
                        <div className='name'>{run.user}</div>
                        <div className='training'>{run.training}</div>
                        <div className='date'>{run.date}</div>                        
                    </li>
                )}
            </ul>
        </div>
    )
}

export default RunsList