import React, {Fragment, useState} from 'react'
import '../css/ExerciseItem.css';
import Option from  '../tool/Option.js';
import Error from  '../Error.js';
import API from "../../utils/API";


const ExerciseItem = (props) => {

    const [exercise, setExercise] = useState(props.data);
    const [error, setError] = useState();

    const remove = async () => {                
        try {
            const name = exercise.name;
            const { data } = await API.deleteExercise({name}); 
            if (data.trainings) {                        
                setError(data.trainings);            
            } else props.update();            
        } catch (error) {
            console.log(error);
        }
    };

    const back = () => {
        props.back();
    }

    return ( 
        <div className="backgroundItem">
            <div className="item" key={exercise.id}>
                <Option back={back} remove={remove}></Option>
                {error && <Error data={error}/>}
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