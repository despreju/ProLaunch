import React, {useState, useEffect} from "react";
import Form from "react-bootstrap/Form";
import API from "../../../../utils/API";
import './EditUser.css';


const EditUser = (props) => {

  //send formulaire
  const send = async () => {    
    /* if (!{name} || {name}.length === 0) return; 
    if (!{chapters} || {chapters}.length === 0) return; 
    try {  
      const { data } = await API.createTraining({ name, chapters });
      const newTraining = {id:data.id, name:data.name};
      props.update(newTraining);
    } catch (error) {
      console.error(error);
    } */
  };

  //back formulaire
  const back = () => {
    props.back();
  }

  const insertExercise = (args) => {  
    sessionObject.exercise=args[1];    
    sessionObject.id=chapters[args[0]].sessions.length;    
    let temp = [];
    temp = temp.concat(chapters);
    temp[args[0]].sessions.push(sessionObject);
    setChapters(temp);  
    setDisplayChooseExercise();
  }

  return (         
    <div className="editUser">         
      
    </div>      
  );

}

export default EditUser;