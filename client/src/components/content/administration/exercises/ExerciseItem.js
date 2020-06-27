import React, {Fragment, useEffect, useState} from 'react'
import './ExerciseItem.css';
import Option from  '../../Option.js';

const ExerciseItem = (props) => {

    const [option, setOption] = useState(false);
    const [isRemoved, setIsRemoved] = useState(false);

    const handleSetOption = () => {
        setOption(!option);
    }

    return ( 
        <Fragment>
            {!isRemoved &&       
            <li key={props.id} onMouseEnter={handleSetOption} onMouseLeave={handleSetOption}>
                <i className="fas fa-dumbbell"></i>
                <div className='infos'>
                    <p className='name'>{props.name}</p>
                    <p className='difficulty'>{props.difficulty}</p>
                </div>
                <Option itemType="exercise" itemId={props.id} itemName={props.name} remove={setIsRemoved} />
            </li>}
        </Fragment>
    )

}

export default ExerciseItem;