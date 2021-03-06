import React, { useState } from 'react'
import '../css/Repetitions.css';

const Repetitions = (props) => {

    return (
        <div className="repetitions">            
            {props.isEditMode && <i className="fas fa-times" onClick={props.remove}></i>}
            {props.isEditMode && <i className="fas fa-minus-circle" onClick={props.minus}></i>}
            <div>{props.rep}</div>
            {props.isEditMode && <i className="fas fa-plus-circle"onClick={props.plus}></i>}         
        </div>
    )
}

export default Repetitions;