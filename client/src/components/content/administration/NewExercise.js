import React, {useContext, useState, useEffect} from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from "../../../utils/API";
import './NewExercise.css';

const NewExercise = () => {

  //State
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [location, setLocation] = useState("");

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
    } catch (error) {
      console.error(error);
    }
  };

  return (         
    <div className="tuile newExercise">      
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
      <div className='button' onClick={send}>
        Créer exercice
      </div>
    </div>
  );

}

export default NewExercise;