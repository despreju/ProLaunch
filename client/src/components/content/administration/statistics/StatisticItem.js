import React, {Fragment, useState} from 'react'
import './StatisticItem.css';
import Option from  '../../Option.js';
import API from "../../../../utils/API.js";

const StatisticItem = (props) => {

    const [statistic, setStatistic] = useState(props.data);

    const remove = async () => {                
        console.log("statistics delete");
    };

    const back = () => {
        props.back();
    }

    return ( 
        <div className="backgroundItem">
            <div className="item" key={statistic.id}>
                <Option back={back} remove={remove}></Option>
                <div className='infos'>
                    {statistic.user} a fait {statistic.training} pendant {statistic.duration} ms
                </div>
            </div>
        </div>
    )

}

export default StatisticItem;