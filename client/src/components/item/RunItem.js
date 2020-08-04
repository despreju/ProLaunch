import React, {useState} from 'react'
import '../css/StatisticItem.css';
import Option from  '../tool/Option.js';
import API from "../../utils/API.js";

const RunItem = (props) => {

    const [run, setRun] = useState(props.data);

    const remove = async () => {                
        try {
            const id = run.id;
            const { data } = await API.deleteRun({id});           
            props.update();
        } catch (error) {
            console.log(error);
        }
    };

    const back = () => {
        props.back();
    }

    return ( 
        <div className="backgroundItem">
            <div className="item" key={run.id}>
                <Option back={back} remove={remove}></Option>
                <div className='infos'>
                    {run.user} a fait {run.training} pendant {run.duration} ms
                </div>
            </div>
        </div>
    )

}

export default RunItem;