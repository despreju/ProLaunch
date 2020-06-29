import React, {useState, Fragment} from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from "../../../../utils/API.js";
import './NewExercise.css';
import Option from '../../Option.js';

const NewExercise = (props) => {

  //State
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [location, setLocation] = useState("");
  const [displayNewExercise, setDisplayNewExercise] = useState(false);

  //Handle
  const handleSetName = (event) => {
    setName(event.target.value);
  }
  const handleSetDifficulty = (event) => {
    setDifficulty(event.target.value);
  }  
  const handleSetLocation = (event) => {
    setLocation(event.target.value);
  }  

  //Component
  const send = async () => {    
    if (!{name} || {name}.length === 0) return; 
    try {  
      const { data } = await API.createExercise({ name, difficulty, location });
      const newExercise = {id:data.id, name:data.name, difficulty:data.difficulty, location:data.location};
      props.update(newExercise);
      setDisplayNewExercise(!{displayNewExercise});
    } catch (error) {
      console.error(error);
    }
  };

  const back = () => {
    setName('');
    setDifficulty(1);
    setLocation('');
    setDisplayNewExercise();
  }

  return ( 
    <Fragment>        
      {displayNewExercise ?
        <li className="newExercise">      
          <FormGroup controlId="name" bsSize="large">
            <ControlLabel>Name</ControlLabel>
            <FormControl
                type="name"
                value={name}
                onChange={handleSetName}
            />
          </FormGroup>
          <FormGroup controlId="difficulty" bsSize="large">
            <ControlLabel>Difficulté</ControlLabel>
            <FormControl
                type="difficulty"
                value={difficulty}
                onChange={handleSetDifficulty}          
            />
          </FormGroup>
          <FormGroup controlId="location" bsSize="large">
            <ControlLabel>Location</ControlLabel>
            <FormControl
                type="location"
                value={location}
                onChange={handleSetLocation}          
            />
          </FormGroup>
          <Option back={back} valid={send}/>
        </li> :
        <li key={1} className='addExercise' onClick={setDisplayNewExercise}>
            <i className="fas fa-plus"></i>
            Ajouter un exercice
        </li>
      }
    </Fragment>
  );

}

export default NewExercise;