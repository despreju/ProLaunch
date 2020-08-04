import React, {useState, useContext, Fragment} from "react";
import Form from "react-bootstrap/Form";
import API from "../../utils/API";
import '../css/TrainingItem.css';
import Option from '../tool/Option.js';
import Repetitions from '../tool/Repetitions.js';
import {RunContext} from '../../contexts/RunContext.js';
import {MenuContext} from '../../contexts/MenuContext.js';

const TrainingItem = (props) => {

  //State
  const [name, setName] = useState(props.trainingName);
  const [exercises, setExercises] = useState([]);
  const [chapters, setChapters] = useState(props.data);
  const [displayChooseExercise, setDisplayChooseExercise] = useState();
  const [isEditMode, setIsEditMode] = useState(props.isEditMode);

  //Context
  const [run, setRun] = useContext(RunContext);
  const [menuSelected, setMenuSelected] = useContext(MenuContext);

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
                            "sessions" : [],
                            "_id" : chapters.length,                       
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
      const _id = props.trainingId;
      if (_id === "") { const { data } = await API.createTraining({ name, chapters }); }
      else { const { data } = await API.saveTraining({ name, chapters, _id }); }      
      props.update();
    } catch (error) {
      console.error(error);
    }
  };

  //back form
  const back = () => {
    props.back();
  }

  //back form
  const cancelEdit = () => {
    props.cancelEdit();
  }

  //edit form
  const edit = () => {
    setIsEditMode(true);
  }

  const start = () => {
    setMenuSelected("run");
    //On définit globalement le run
    handleSetRun();        
  }

  const handleSetRun = () => {
    const run = {name:name, chapters:chapters};
    localStorage.setItem("run", JSON.stringify(run));
    setRun(run);
  }

  const remove = async () => {                
    try {
        const { data } = await API.deleteTraining({name});           
        props.update(["remove", name]);
    } catch (error) {
        console.log(error);
    }
  };


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

  const removeItems = (args) => {  
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
        {props.level === "user" ?
          <Option back={back} start={start}/> :
          <Fragment>
            {isEditMode ? 
              <Option back={cancelEdit} valid={send}/> :
              <Option back={back} edit={edit} remove={remove}/>
            }
          </Fragment>
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
                    <Repetitions isEditMode={isEditMode} rep={session.repetitions} plus={() => plusReps([chapter._id,session._id])} minus={() => minusReps([chapter._id,session._id])} remove={() => removeItems([chapter._id,session._id])}/>
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
              <Repetitions isEditMode={isEditMode} rep={chapter.repetitions} plus={() => plusReps([chapter._id])} minus={() => minusReps([chapter._id])} remove={() => removeItems([chapter._id])}/>
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