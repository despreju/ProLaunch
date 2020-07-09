import React, {Fragment, useState} from 'react'
import './TrainingItem.css';
import Option from  '../../Option.js';

const TrainingItem = (props) => {

    const [isRemoved, setIsRemoved] = useState(false);

    return ( 
        <Fragment>
            {!isRemoved &&       
            <li className="item" key={props.id} onClick={props.onClick}>
                <i className="fas fa-running"></i>
                <div className='infos'>
                    <p className='name'>{props.name}</p>            
                </div>
            </li>}
        </Fragment>
    )

}

export default TrainingItem;