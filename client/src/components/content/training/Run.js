import React, {useState, useContext, useEffect, Fragment} from "react";
import './Run.css';
import API from "../../../utils/API.js";
import {RunContext} from '../../../contexts/RunContext.js';
import {CredentialContext} from '../../../contexts/CredentialContext';
import {Link} from 'react-router-dom';

export default function Run() {

    //State
    const [progressIndex, setProgressIndex] = useState(-1);
    const [usableRun, setUsableRun] = useState([]);
    const [startTime, setStartTime] = useState();

    //Context
    const [run, setRun] = useContext(RunContext);    
    const {profile} = useContext(CredentialContext);
    
    useEffect(() => {
        console.log('Run - useEffect')
        buildUsableRun();
    }, []);

    const buildUsableRun = () => {
        const usableRunObject = [];
        let index = 0;
        run.chapters.forEach(chapter => {
            for (let i = 0; i < chapter.repetitions; i++) {
                chapter.sessions.forEach(session => {
                    usableRunObject.push({id:index,exercise:session.exercise.name,repetitions:session.repetitions,inprogress:false});
                    index++;
                });
            }            
        });
        setUsableRun(usableRunObject);
    }
    
    const startRun = () => {
        setStartTime(new Date().getTime());
        setProgressIndex(progressIndex+1);
    }

    const nextRun = () => {
        setProgressIndex(progressIndex+1);
    }

    const finishRun = async () => {                 
        try {  
            const training = run.name;
            const user = profile.email;
            const duration = new Date().getTime() - startTime;
            const state = 'finish';
            const { data } = await API.createRun({ training, user, duration, state });
            localStorage.removeItem("run");
            setRun(null);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="run">
            {progressIndex === -1 &&
                <div className="startButton" onClick={() => startRun()}>Début</div>
            }
            {(-1 < progressIndex && progressIndex < usableRun.length) &&
            <Fragment>
                {usableRun.map((el) =>           
                    <Fragment>
                        {(progressIndex === el.id+1 && progressIndex !== 0) &&
                            <div className="previousExercise">          
                                {el.id}
                                <div className="exerciseInfos">{el.exercise}</div>
                                <div className="exerciseRepetitions">{el.repetitions}</div>                          
                            </div>                           
                        }  
                        {progressIndex === el.id &&
                            <div key={el.id} className="currentExercise" onClick={() => nextRun()}>       
                                {progressIndex}{el.id}  
                                <div className="exerciseInfos">{el.exercise}</div>
                                <div className="exerciseRepetitions">{el.repetitions}</div>                          
                            </div>                           
                        }  
                        {(progressIndex === el.id-1 && progressIndex !== usableRun.length-1) &&
                            <div className="nextExercise">          
                                {el.id}
                                <div className="exerciseInfos">{el.exercise}</div>
                                <div className="exerciseRepetitions">{el.repetitions}</div>                          
                            </div>                           
                        }  
                    </Fragment> 
                )}
            </Fragment>  
            }         
            {progressIndex === usableRun.length &&
                <Link to="/" onClick={() => finishRun()}> 
                    <div className="finishButton">Fin</div>
                </Link>
            }
        </div>
    )
}
