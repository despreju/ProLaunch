import React, {useState, useEffect} from "react";
import Form from "react-bootstrap/Form";
import API from "../../../../utils/API";
import './NewTraining.css';
import Option from '../../Option.js';
import Repetitions from './Repetitions.js';

const NewTraining = (props) => {

  useEffect(() => {
  });

  //State
  const [name, setName] = useState("");
  const [exercises, setExercises] = useState([]);
  const [chapters, setChapters] = useState(props.data);
  const [displayChooseExercise, setDisplayChooseExercise] = useState();

  //Handle
  const handleSetName = (event) => {
    setName(event.target.value);
  }

  //chargement des exercices
  const fetchData = async () => {
      const result = await API.getAllExercises();
      setExercises(result.data);
  };

  //structures données chapitre
  const chapterObject =  {
                            "_id" : chapters.length,
                            "name" : "chapter" + chapters.length,
                            "sessions" : [],
                            "repetitions" : 1
                          };

  //structures données chapitre
  const sessionObject = { 
                          "exercise" : {
                            "name" : "",
                            "_id": ""
                          },
                          "repetitions" : 1
                        };                          

  //send formulaire
  const send = async () => {    
    if (!{name} || {name}.length === 0) return; 
    if (!{chapters} || {chapters}.length === 0) return; 
    try {              
      const { data } = await API.createTraining({ name, chapters });
      console.log("new training",data);    
      props.update(data);
    } catch (error) {
      console.error(error);
    }
  };

  //back formulaire
  const back = () => {
    props.back();
  }


  const addChapter = (event) => {
    event.stopPropagation();
    let temp = [];
    temp = temp.concat(chapters);
    temp.push(chapterObject);
    setChapters(temp);   
  }

  const chooseExercise = (chapterId) => {
    fetchData();
    setDisplayChooseExercise(chapterId);
  }

  const insertExercise = (args) => {  
    chapters.find(obj => {
      if (obj._id === args[0]) {
        sessionObject.exercise.name=args[1];    
        sessionObject._id = obj.sessions.length; 
        obj.sessions.push(sessionObject);
      }      
    });
    let temp = [];
    temp = temp.concat(chapters);
    setChapters(temp);  
    setDisplayChooseExercise();
    console.log(displayChooseExercise);
  }
  
  const minusReps = (args) => {  
    let temp = [];
    temp = temp.concat(chapters);
    args.length === 1 ? temp[args[0]].repetitions-- : temp[args[0]].sessions[args[1]].repetitions--;
    setChapters(temp);
  }

  const plusReps = (args) => {  
    let temp = [];
    temp = temp.concat(chapters);
    args.length === 1 ? temp[args[0]].repetitions++ : temp[args[0]].sessions[args[1]].repetitions++;
    setChapters(temp);
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

          {chapters.map((chapter) =>                     
            <div key={chapter._id} className="chapter">
              <div className="part">
                {chapter.sessions.map((session) => 
                  <div className="session">
                    <div key={session._id} className="exercise">{session.exercise.name}</div>
                    <Repetitions rep={session.repetitions} plus={() => plusReps([chapter._id,session._id])} minus={() => minusReps([chapter._id,session._id])}/>
                  </div>                    
                )}
                {!(displayChooseExercise === chapter._id) ? 
                  <div className="add addSession" onClick={() => chooseExercise(chapter._id)}>
                    <i className="fas fa-plus"/>Ajouter un exercice
                  </div> :
                  <div className="chooseExercise">
                    {exercises.map((exercise) => 
                      <li key={exercise._id} className="exercise" onClick={() => insertExercise([chapter._id, exercise.name])}>
                        {exercise.name}
                      </li>                    
                    )}
                  </div>
                }  
              </div>
              <Repetitions rep={chapter.repetitions} plus={() => plusReps([chapter._id])} minus={() => minusReps([chapter._id])}/>
            </div>             
          )}
          <div className="add addChapter" onClick={addChapter}>
            <i className="fas fa-plus"/>Ajouter un chapitre
          </div>            

        </Form>
        <Option back={back} valid={send}/>
      </div>
    </div>      
  );

}

export default NewTraining;