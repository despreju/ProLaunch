import React, {useContext, useState, useEffect} from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from "../../utils/API";
import './Login.css';
import ErrorLogin from './ErrorLogin'
import {CredentialContext} from '../../contexts/CredentialContext';

const Login = (props) => {

  const {handleSetIslogged} = useContext(CredentialContext);

  //State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //Handle
  const handleSetEmail = (event) => {
    setEmail(event.target.value);
  }  
  const handleSetPassword = (event) => {
    setPassword(event.target.value);
  }  
  const handleSetError = (error) => {
    setError(error);
  }

  //Component
  const send = async () => {
    try {
      if (!email || email.length === 0) throw new Error('Opss!');
      if (!password || password.length === 0) throw new Error('Opss!');
      const { data } = await API.login(email, password);
      const profile = {email:data.email, name:data.name};
      localStorage.setItem("token", data.token);
      localStorage.setItem("profile", JSON.stringify(profile));
      window.location = "/";
    } catch (error) {
      handleSetError(error.message);
    }
  };

  const signUp = () => {
    console.log('signUp');
      props.signUp();
  }

  return (         
    <div className="tuile login">      
      <FormGroup controlId="email">
        <ControlLabel>Email</ControlLabel>
        <FormControl
          autoFocus
          type="email"
          value={email}
          onChange={handleSetEmail}
        />
      </FormGroup>
      <FormGroup controlId="password">
        <ControlLabel>Password</ControlLabel>
        <FormControl
          value={password}
          onChange={handleSetPassword}
          type="password"
        />
      </FormGroup>
      <div className='button' onClick={send}>Connexion</div>
      {error && <ErrorLogin error={error}/>}            
      <div className="signupButton" onClick={signUp}>Je n'ai pas de compte</div>
    </div>
  );

}

export default Login;