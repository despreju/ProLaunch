import React from 'react'
import './Error.css';

const Error = (props) => {

    return (
        <div className="errorContent">
            <p className="errorTitle">Cet exercice est utilisé par le ou les entrainements suivants :</p>
            {props.data.map((data) => 
                <p className="errorData">{data}</p>
            )}
        </div>
    )
    
}

export default  Error;