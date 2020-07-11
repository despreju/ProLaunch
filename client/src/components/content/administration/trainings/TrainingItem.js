import React, {useState, useEffect, Fragment} from "react";
import Form from "react-bootstrap/Form";
import API from "../../../../utils/API";
import './TrainingItem.css';
import Option from '../../Option.js';
import Repetitions from './Repetitions.js';

const TrainingItem = (props) => {

  useEffect(() => {
  });

  //State
  const [name, setName] = useState(props.trainingName);
  const [exercises, setExercises] = useState([]);
  const [chapters, setChapters] = useState(props.data);
  const [displayChooseExercise, setDisplayChooseExercise] = useState();
  const [isEditMode, setIsEditMode] = useState(props.isEditMode);

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

  //back form
  const back = () => {
    props.back();
  }

  //edit form
  const edit = () => {
    setIsEditMode(true);
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
    temp.find(chapter => {
      if (chapter._id === args[0]) {
        if (args.length === 1) chapter.repetitions--;
        else chapter.sessions.find(session => {
          if (session._id === args[1]) session.repetitions--;
        });
      }      
    });
    setChapters(temp);
  }

  const plusReps = (args) => {  
    let temp = [];
    temp = temp.concat(chapters);
    temp.find(chapter => {
      if (chapter._id === args[0]) {
        if (args.length === 1) chapter.repetitions++;
        else chapter.sessions.find(session => {
          if (session._id === args[1]) session.repetitions++;
        });
      }      
    });
    setChapters(temp);
  }

  const remove = (args) => {  
    let temp = [];
    temp = temp.concat(chapters);
    const chapterIndex = temp.findIndex(chapter => chapter._id === args[0]);
    if (args.length === 1) temp.splice(chapterIndex,1);
    else {
      const sessionIndex = temp[chapterIndex].sessions.findIndex(session => session._id === args[1]);
      temp[chapterIndex].sessions.splice(sessionIndex,1);
    }
    setChapters(temp);
  }

  return (         
    <div className="backgroundItem">         
      <div className="item">    
        {isEditMode ? 
          <Option back={back} valid={send}/> :
          <Option back={back} edit={edit}/>
        }
        <Form>
          {isEditMode ?
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" placeholder="Enter name" value={name} onChange={handleSetName} />
            </Form.Group> : 
            <h2>{props.trainingName}</h2>
          }
          {chapters.map((chapter) =>                     
            <div key={chapter._id} className="chapter">
              <div className="part">
                {chapter.sessions.map((session) => 
                  <div className="session">
                    <div key={session._id} className="exercise">{session.exercise.name}</div>
                    <Repetitions isEditMode={isEditMode} rep={session.repetitions} plus={() => plusReps([chapter._id,session._id])} minus={() => minusReps([chapter._id,session._id])} remove={() => remove([chapter._id,session._id])}/>
                  </div>                    
                )}
                {isEditMode &&
                  <Fragment>
                    {!(displayChooseExercise === chapter._id) ? 
                      <div className="add addSession" onClick={() => chooseExercise(chapter._id)}>
                        <i className="fas fa-plus"/>Ajouter un exercice
                      </div> :
                      <div className="chooseExercise">
                        <div className="backChooseExercise" onClick={() => setDisplayChooseExercise(false)}><i className="fas fa-long-arrow-alt-left"></i><p>Retour</p></div>
                        {exercises.map((exercise) => 
                          <li key={exercise._id} className="exercise" onClick={() => insertExercise([chapter._id, exercise.name])}>
                            {exercise.name}
                          </li>                    
                        )}                        
                      </div>
                     
                    } 
                  </Fragment> 
                }
              </div>
              <Repetitions isEditMode={isEditMode} rep={chapter.repetitions} plus={() => plusReps([chapter._id])} minus={() => minusReps([chapter._id])} remove={() => remove([chapter._id])}/>
            </div>             
          )}
          {isEditMode &&
            <Fragment>
              <div className="add addChapter" onClick={addChapter}>
                <i className="fas fa-plus"/>Ajouter un chapitre
              </div>            
            </Fragment> 
          }
        </Form>        
      </div>
    </div>      
  );

}

export default TrainingItem;