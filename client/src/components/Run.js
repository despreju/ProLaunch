import React, {useState, useContext, useEffect, Fragment} from "react";
import './css/Run.css';
import API from "../utils/API.js";
import {RunContext} from '../contexts/RunContext.js';
import {CredentialContext} from '../contexts/CredentialContext';
import Chainon from './tool/Chainon.js';

export default function Run() {

    //State²
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
        usableRunObject.push({id:-1})
        let index = 0;
        run.chapters.forEach(chapter => {
            for (let i = 0; i < chapter.repetitions; i++) {
                chapter.sessions.forEach(session => {
                    usableRunObject.push({
                                            id:index,
                                            exercise:session.exercise.name,
                                            difficulty:session.exercise.difficulty,
                                            repetitions:session.repetitions,
                                            inprogress:false
                                        });
                    index++;
                });
            }            
        });
        usableRunObject.push({id:usableRunObject.length-1})
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
            setProgressIndex(progressIndex+1);
            const { data } = await API.createRun({ training, user, duration, state });
        } catch (error) {
            console.error(error);
        }
    };

    const closeRun = async () => {                 
        try {  
            localStorage.removeItem("run");
            setRun(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="run">     
            <div className="timeline">      
                <div>progressIndex : {progressIndex}</div>
                <div>usableRun.length : {usableRun.length}</div>  
            </div>
            <div className="chainons">
                {usableRun.map((el) =>           
                    <Fragment>     
                        {progressIndex === -1 &&                             
                            <Fragment>
                                {el.id === -1 && 
                                    <Fragment>
                                        <Chainon progressIndex={progressIndex} class="blankLeft" session={false}/>
                                        <Chainon progressIndex={progressIndex} class="start current" session={{start:"Commencer"}} action={startRun}/>
                                    </Fragment>}                           
                                {el.id === 0 && <Chainon progressIndex={progressIndex} class="next" session={el}/>}
                            </Fragment>
                        } 
                        {progressIndex === 0 &&                             
                            <Fragment>
                                {el.id === -1 && <Chainon progressIndex={progressIndex} class="previous start" session={el}/>}                           
                                {el.id === 0 && <Chainon progressIndex={progressIndex} class="current" session={el} action={nextRun}/>}
                                {el.id === 1 && <Chainon progressIndex={progressIndex} class="next" session={el}/>}
                            </Fragment>
                        } 
                        {(progressIndex > 0 && progressIndex < usableRun.length-3) &&                               
                            <Fragment>
                                {el.id === progressIndex-1 && <Chainon progressIndex={progressIndex} class="previous" session={el}/>}                           
                                {el.id === progressIndex && <Chainon progressIndex={progressIndex} class="current" session={el} action={nextRun}/>}
                                {el.id === progressIndex+1 && <Chainon progressIndex={progressIndex} class="next" session={el}/>}
                            </Fragment>
                        } 
                        {progressIndex === usableRun.length-3 &&                               
                            <Fragment>
                                {el.id === progressIndex-1 && <Chainon progressIndex={progressIndex} class="previous" session={el}/>}                           
                                {el.id === progressIndex && <Chainon progressIndex={progressIndex} class="current" session={el} action={finishRun}/>}
                                {el.id === progressIndex+1 && <Chainon progressIndex={progressIndex} class="next finish" session={el}/>}
                            </Fragment>
                        } 
                        {progressIndex === usableRun.length-2 &&                               
                            <Fragment>
                                {el.id === progressIndex-1 && <Chainon progressIndex={progressIndex} class="previous" session={el}/>}                           
                                {el.id === progressIndex && 
                                    <Fragment>
                                        <Chainon progressIndex={progressIndex} class="current finish" session={{finish:"Terminer"}} action={closeRun}/>
                                        <Chainon progressIndex={progressIndex} class="blankRight" session={false}/>
                                    </Fragment>}
                            </Fragment>
                        } 
                    </Fragment> 
                )}                   
            </div>              
        </div>
    )
}
