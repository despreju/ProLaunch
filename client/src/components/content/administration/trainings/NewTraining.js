import React, {useState, Fragment} from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from "../../../../utils/API";
import './NewTraining.css';
import Option from '../../Option.js';

const NewTraining = (props) => {

  //State
  const [name, setName] = useState("");
  const [exercises, setExercises] = useState("");
  const [displayNewTraining, setDisplayNewTraining] = useState(false);

  //Handle
  const handleSetName = (event) => {
    setName(event.target.value);
  }
  const handleSetExercises = (event) => {
    setExercises(event.target.value);
  }

  //Component
  const send = async () => {    
    if (!{name} || {name}.length === 0) return; 
    if (!{exercises} || {exercises}.length === 0) return; 
    try {  
      const { data } = await API.createTraining({ name, exercises });
      const newTraining = {id:data.id, name:data.name};
      props.update(newTraining);
      setDisplayNewTraining(!{displayNewTraining});
    } catch (error) {
      console.error(error);
    }
  };

  const back = () => {
    setName('');
    setDisplayNewTraining();
  }

  return (         
    <Fragment>
      {displayNewTraining ?
        <li className="newTraining">      
{/*           <FormGroup controlId="name" bsSize="large">
            <ControlLabel>Name</ControlLabel>
            <FormControl
                type="name"
                value={name}
                onChange={handleSetName}
            />
          </FormGroup>
          <FormGroup controlId="exercises" bsSize="large">
            <ControlLabel>Exercises</ControlLabel>
            <FormControl
                type="exercises"
                value={exercises}
                onChange={handleSetExercises}
            />
          </FormGroup> */}
          <Option back={back} valid={send}/>
        </li> :
        <li key={1} className='addTraining' onClick={setDisplayNewTraining}>
          <i className="fas fa-plus"></i>
          Ajouter un entrainement
        </li>
      }
    </Fragment>
  );

}

export default NewTraining;