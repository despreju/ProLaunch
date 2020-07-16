import React, {useState, useContext, useEffect, Fragment} from "react";
import './Run.css';
import {RunContext} from '../../../contexts/RunContext.js';

export default function Run() {

    //State
    const [progressIndex, setProgressIndex] = useState(-1);
    const [usableRun, setUsableRun] = useState([]);

    //Context
    const [run, setRun] = useContext(RunContext);

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
    
    const nextRun = () => {
        console.log("nextRun");
        setProgressIndex(progressIndex+1);
    }

    const finishRun = () => {
        console.log("finishRun");
    }

    return (
        <div className="run">
            {progressIndex === -1 &&
                <div className="startButton" onClick={() => nextRun()}>Début</div>
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
                <div className="finishButton" onClick={() => finishRun()}>Fin</div>
            }
        </div>
    )
}
