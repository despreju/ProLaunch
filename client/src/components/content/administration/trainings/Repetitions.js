import React, { useState } from 'react'
import './Repetitions.css';

const Repetitions = (props) => {

  //State
  const [rep, setRep] = useState(0);

    return (
        <div className="repetitions">            
            <i className="fas fa-minus-circle" onClick={props.minus}></i>
            <div>{props.rep}</div>
            <i className="fas fa-plus-circle"onClick={props.plus}></i>            
        </div>
    )
}

export default Repetitions;