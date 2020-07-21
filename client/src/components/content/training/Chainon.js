import React, {Fragment} from "react";
import './Chainon.css'
import Gauge from '../Gauge.js'

const Chainon = (props) => {

    const manageAction = () => {
        if (props.action) props.action();
    }

    return (                 
        <div key={props.session.id} className={`chainon ${props.class}`} onClick={() => manageAction()}>                
            {props.session.exercise &&    
                <Fragment>    
                    <div className="part exerciseRepetitions"> Répétitions : x
                        <div className="">{props.session.repetitions}</div>
                    </div> 
                    <div className="part exerciseInfos">{props.session.exercise}</div>          
                    <div className="part exerciseDifficulty"><Gauge level={props.session.difficulty}/></div>         
                </Fragment> 
            }
            {props.session.start && <div className="part">{props.session.start}</div>}    
            {props.session.finish && <div className="part">{props.session.finish}</div>}    
        </div>           
        
    )
}

export default Chainon;