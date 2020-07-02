import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import {DropdownButton, Dropdown } from "react-bootstrap";
import API from "../../../../utils/API.js";
import './NewExercise.css';
import Option from '../../Option.js';

const NewExercise = (props) => {

  //State
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [location, setLocation] = useState("");

  //Handle
  const handleSetName = (event) => {
    setName(event.target.value);
  }
  const handleSetDifficulty = (event) => {
    if (typeof event.target.value !== 'undefined') setDifficulty(event.target.value);
  }  
  const handleSetLocation = (event) => {
    if (typeof event.target.value !== 'undefined') setLocation(event.target.value);
  }  

  //Component
  const send = async () => {    
    if (!{name} || {name}.length === 0) return; 
    try {  
      const { data } = await API.createExercise({ name, difficulty, location });
      const newExercise = {id:data.id, name:data.name, difficulty:data.difficulty, location:data.location};
      props.update(newExercise);
    } catch (error) {
      console.error(error);
    }
  };

  const back = () => {
    setName('');
    setDifficulty(1);
    setLocation('');
    props.back();
  }

  return (      
        <div className="newExercise">
          <div className="form">      
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="Enter name" value={name} onChange={handleSetName} />
              </Form.Group>  

              <Form.Group controlId="password">
                <Form.Label>Difficulty</Form.Label>
                <div className="checkbox" onClick={handleSetDifficulty}>        
                    <div>
                      <input type="radio" id="1" name="difficulty" value="1"/>
                      <label for="1">1</label>
                    </div>

                    <div>
                      <input type="radio" id="2" name="difficulty" value="2"/>
                      <label for="2">2</label>
                    </div>

                    <div>
                      <input type="radio" id="3" name="difficulty" value="3"/>
                      <label for="3">3</label>
                    </div>   

                    <div>
                      <input type="radio" id="4" name="difficulty" value="4"/>
                      <label for="4">4</label>
                    </div>   

                    <div>
                      <input type="radio" id="5" name="difficulty" value="5"/>
                      <label for="5">5</label>
                    </div>   
                  </div>     
              </Form.Group>  

              <Form.Group controlId="location">
                  <Form.Label>Location</Form.Label>      
                  <div className="checkbox" onClick={handleSetLocation}>        
                    <div>
                      <input type="radio" id="huey" name="location" value="Haut du corps"/>
                      <label for="huey">Haut du corps</label>
                    </div>

                    <div>
                      <input type="radio" id="dewey" name="location" value="Bas du corps"/>
                      <label for="dewey">Bas du corps</label>
                    </div>

                    <div>
                      <input type="radio" id="louie" name="location" value="Complet"/>
                      <label for="louie">Complet</label>
                    </div>   
                  </div>         
              </Form.Group>     

            </Form>
            <Option back={back} valid={send}/>
          </div>
        </div>      
  );

}

export default NewExercise;