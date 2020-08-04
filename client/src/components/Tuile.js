import React from 'react'
import './css/Tuile.css';

const Tuile = (props) => {

    return (
        <div className={`tuile ${props.active ? 'active' : 'inactive'}`} onClick={props.onClick}>     
            <i className={props.logo}></i>
            <p>{props.title}</p>
        </div>
    )
}

export default Tuile;