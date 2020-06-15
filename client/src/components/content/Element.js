import React from 'react'
import './Element.css';

const  Element = (props) => {
    return (
        <div className={`tuile ${props.active ? 'active' : 'inactive'}`}>     
            <i class={props.logo}></i>
            <p>{props.title}</p>
        </div>
    )
}

export default Element;