import React from 'react'
import './ErrorLogin.css';

const ErrorLogin = (props) => {

    return (
        <div className="error">
            {props.error};            
        </div>
    )

}

export default ErrorLogin;