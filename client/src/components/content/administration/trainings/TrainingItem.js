import React, {Fragment, useState} from 'react'
import './TrainingItem.css';
import Option from  '../../Option.js';

const TrainingItem = (props) => {

    const [isRemoved, setIsRemoved] = useState(false);

    return ( 
        <Fragment>
            {!isRemoved &&       
            <li className="item" key={props.id}>
                <i className="fas fa-running"></i>
                <div className='infos'>
                    <p className='name'>{props.name}</p>
                    {props.exercises.map((exercise) =>                     
                        <p className='exercices'>{exercise.name}</p>)        
                    }
                </div>
            </li>}
        </Fragment>
    )

}

export default TrainingItem;