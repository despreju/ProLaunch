import React, {useState, Fragment} from "react";
import Form from "react-bootstrap/Form";
import API from "../../../../utils/API";
import './NewTraining.css';
import Option from '../../Option.js';

const NewTraining = (props) => {

  //State
  const [name, setName] = useState("");
  const [exercises, setExercises] = useState("");

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
    } catch (error) {
      console.error(error);
    }
  };

  const back = () => {
    setName('');
    props.back();
  }

  return (         
    <div className="newTraining">         
      <div className="form">    
        <h2>Création d'un entrainement</h2>  
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Enter name" value={name} onChange={handleSetName} />
          </Form.Group>  
        </Form>
        <Option back={back} valid={send}/>
      </div>
    </div>      
  );

}

export default NewTraining;