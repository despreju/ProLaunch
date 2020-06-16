import React from 'react'
import './Tuile.css';

const Tuile = (props) => {

    return (
        <div className={`tuile ${props.class} ${props.active ? 'active' : 'inactive'}`} onClick={props.onClick}>     
            <i className={props.logo}></i>
            <p>{props.title}</p>
        </div>
    )
}

export default Tuile;