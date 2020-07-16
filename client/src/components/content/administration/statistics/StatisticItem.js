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
            <div className="statisticItem" key={statistic.id}>
                <Option back={back} remove={remove}></Option>
                <div className='infos'>
                    {props.data.user} a fait {props.data.training} pendant {props.data.duration} ms
                </div>
            </div>
        </div>
    )

}

export default StatisticItem;