import React, {useContext, useState, useEffect} from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from "../../../../utils/API";
import './NewTraining.css';

const NewTraining = (props) => {

  //State
  const [name, setName] = useState("");

  //Handle
  const handleSetName = (event) => {
    setName(event.target.value);
  }

  //Component
  const send = async () => {    
    if (!{name} || {name}.length === 0) return; 
    try {  
      const { data } = await API.createTraining({ name });
      const newTraining = {id:data.id, name:data.name};
      props.update(newTraining);
    } catch (error) {
      console.error(error);
    }
  };

  return (         
    <div className="tuile newTraining">      
      <FormGroup controlId="name" bsSize="large">
        <ControlLabel>Name</ControlLabel>
        <FormControl
            type="name"
            value={name}
            onChange={handleSetName}
        />
      </FormGroup>
      <div className='button' onClick={send}>
        Créer entrainement
      </div>
    </div>
  );

}

export default NewTraining;