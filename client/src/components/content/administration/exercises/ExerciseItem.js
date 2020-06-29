import React, {Fragment, useState} from 'react'
import './ExerciseItem.css';
import Option from  '../../Option.js';

const ExerciseItem = (props) => {

    const [isRemoved, setIsRemoved] = useState(false);

    return ( 
        <Fragment>
            {!isRemoved &&       
            <li className="item" key={props.id}>
                <i className="fas fa-dumbbell"></i>
                <div className='infos'>
                    <p className='name'>{props.name}</p>
                    <p className='difficulty'>{props.difficulty}</p>
                </div>
                <Option itemType="exercise" itemId={props.id} itemName={props.name} delete={setIsRemoved} edit={true}/>
            </li>}
        </Fragment>
    )

}

export default ExerciseItem;