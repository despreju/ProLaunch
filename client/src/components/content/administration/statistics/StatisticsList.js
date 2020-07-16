import React, {useEffect, useState} from 'react'
import API from "../../../../utils/API.js";

import './StatisticsList.css';
import StatisticItem from './StatisticItem.js';

const StatisticsList = (props) => {

    const [data, setData] = useState([]);
    const [displayStatistic, setDisplayStatistic] = useState(false);
    const [statisticData, setDataToLoad] = useState([]);

    //Handle
    const handleSetDisplayStatistic = (statistic) => {
        setDataToLoad(statistic);
        setDisplayStatistic(!displayStatistic);
    }  

    useEffect(() => {
        const fetchData = async () => {
            const result = await API.getAllRuns();
            setData(result.data);
        };
        fetchData();
    }, []);

    return (     
        <div className='list statisticsList'>  
        {displayStatistic && <StatisticItem back={setDisplayStatistic} data={statisticData}/>}                              
            <ul>    
                {data.map((statistic) =>
                    <li className="item" key={statistic.id} onClick={() => handleSetDisplayStatistic(statistic)}>
                    <i className="fas fa-chart-bar"></i>
                    <div className='infos'>
                        <p className='name'>{statistic.user}</p>
                        <p className='training'>{statistic.training}</p>
                    </div>
                </li>
                )}
            </ul>
        </div>
    )
}

export default StatisticsList