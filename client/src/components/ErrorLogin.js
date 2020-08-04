import React from 'react'
import './css/ErrorLogin.css';

const ErrorLogin = (props) => {

    return (
        <div className="error">
            {props.error};            
        </div>
    )

}

export default ErrorLogin;