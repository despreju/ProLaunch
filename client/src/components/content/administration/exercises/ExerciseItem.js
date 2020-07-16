import React, {Fragment, useState} from 'react'
import './ExerciseItem.css';
import Option from  '../../Option.js';

const ExerciseItem = (props) => {

    const [exercise, setExercise] = useState(props.data);

    const remove = async () => {                
        console.log("statistics delete");
    };

    const back = () => {
        props.back();
    }

    return ( 
        <div className="backgroundItem">
            <div className="item" key={exercise.id}>
                <Option back={back} remove={remove}></Option>
                <div className='infos'>
                    <p>{exercise.name}</p>
                    <p>{exercise.location}</p>
                    <p>{exercise.difficulty}</p>                  
                </div>
            </div>
        </div>
    )

}

export default ExerciseItem;