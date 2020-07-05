import React, {useState, useEffect} from "react";
import Form from "react-bootstrap/Form";
import API from "../../../../utils/API";
import './NewTraining.css';
import Option from '../../Option.js';
import Repetitions from './Repetitions.js';
import ExercicesList from '../exercises/ExercisesList.js';

const NewTraining = (props) => {

  useEffect(() => {
    console.log('rechargement');
  });

  //State
  const [name, setName] = useState("");
  const [exercises, setExercises] = useState([]);
  const [chapters, setChapters] = useState([]);
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
                            "id" : chapters.length,
                            "name" : "chapter" + chapters.length,
                            "sessions" : [],
                            "repetitions" : 1
                          };

  //structures données chapitre
  const sessionObject = { 
                          "exercise" : "",
                          "repetitions" : 1
                        };                          

  //send formulaire
  const send = async () => {    
    if (!{name} || {name}.length === 0) return; 
    if (!{chapters} || {chapters}.length === 0) return; 
    try {  
      const { data } = await API.createTraining({ name, chapters });
      const newTraining = {id:data.id, name:data.name};
      props.update(newTraining);
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
    sessionObject.exercise=args[1];    
    sessionObject.id=chapters[args[0]].sessions.length;    
    let temp = [];
    temp = temp.concat(chapters);
    temp[args[0]].sessions.push(sessionObject);
    setChapters(temp);  
    setDisplayChooseExercise();
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
            <div key={chapter.id} className="chapter">
              <div className="part">
                {chapter.sessions.map((session) => 
                  <div className="session">
                    <div key={session.id} className="exercise">{session.exercise}</div>
                    <Repetitions rep={session.repetitions} plus={() => plusReps([chapter.id,session.id])} minus={() => minusReps([chapter.id,session.id])}/>
                  </div>                    
                )}
                {!(displayChooseExercise === chapter.id) ? 
                  <div className="add addSession" onClick={() => chooseExercise(chapter.id)}>
                    <i className="fas fa-plus"/>Ajouter un exercice
                  </div> :
                  <div className="chooseExercise">
                    {exercises.map((exercise) => 
                      <li key={exercise.id} className="exercise" onClick={() => insertExercise([chapter.id, exercise.name])}>
                        {exercise.name}
                      </li>                    
                    )}
                  </div>
                }  
              </div>
              <Repetitions rep={chapter.repetitions} plus={() => plusReps([chapter.id])} minus={() => minusReps([chapter.id])}/>
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