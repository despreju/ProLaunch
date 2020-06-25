import React, {Fragment, useEffect, useState} from 'react'
import API from "../../../../utils/API.js";
import './ExerciseItem.css';
import Option from  '../../option';

const ExerciseItem = (props) => {

    const [option, setOption] = useState(false);

    const handleSetOption = () => {
        setOption(!option);
    }


    return (         
        <li key={props.id} onMouseEnter={handleSetOption} onMouseLeave={handleSetOption}>
            <i className="fas fa-dumbbell"></i>
            <div className='infos'>
                <p className='name'>{props.name}</p>
                <p className='difficulty'>{props.difficulty}</p>
            </div>
            <Option itemType="exercise" itemId={props.id} itemName={props.name}/>
        </li>
    )

}

export default ExerciseItem;