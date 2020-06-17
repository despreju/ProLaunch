import React, {useContext, useState, useEffect} from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from "../../utils/API";
import './Login.css';
import {CredentialContext} from '../../contexts/CredentialContext';

const Login = () => {

  const {handleSetIslogged} = useContext(CredentialContext);

  //State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  //Handle
  const handleSetEmail = (event) => {
    setEmail(event.target.value);
  }  
  const handleSetPassword = (event) => {
    setPassword(event.target.value);
  }  
  const handleSetName = (name) => {
    setName(name);
  }

  //Component
  const send = async () => {
   console.log({email});
    if (!email || email.length === 0) {
      return;
    }
    if (!password || password.length === 0) {
      return;
    }
    try {
      const { data } = await API.login(email, password);
      const profile = {email:data.email, name:data.name};
      localStorage.setItem("token", data.token);
      localStorage.setItem("profile", JSON.stringify(profile));
      window.location = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (         
    <div className="tuile login">      
      <FormGroup controlId="email" bsSize="large">
        <ControlLabel>Email</ControlLabel>
        <FormControl
          autoFocus
          type="email"
          value={email}
          onChange={handleSetEmail}
        />
      </FormGroup>
      <FormGroup controlId="password" bsSize="large">
        <ControlLabel>Password</ControlLabel>
        <FormControl
          value={password}
          onChange={handleSetPassword}
          type="password"
        />
      </FormGroup>
      <div className='button' onClick={send}>
        Connexion
      </div>
      <div onClick={handleSetIslogged}></div> 
    </div>
  );

}

export default Login;