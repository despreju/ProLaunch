import React, {useState} from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from "../../utils/API";
import './Signup.css';
import ErrorLogin from './ErrorLogin'

function Signup() {

  //State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  //Handle
  const handleSetEmail = (event) => {
    setEmail(event.target.value);
  }  
  const handleSetPassword = (event) => {
    setPassword(event.target.value);
  }  
  const handleSetCpassword = (event) => {
    setCpassword(event.target.value);
  }  
  const handleSetName = (event) => {
    setName(event.target.value);
  }

  const send = async () => {
    try {
      if (!email || email.length === 0) throw new Error('Opss!');
      if (!name || name.length === 0) throw new Error('Opss!');
      if (!password || password.length === 0 || password !== cpassword) throw new Error('Opss!');
      const { data } = await API.signup({ email, name, password });
      const profile = {email:data.email, name:data.name};
      localStorage.setItem("token", data.token);
      localStorage.setItem("profile", JSON.stringify(profile));
      window.location = "/";
    } catch (error) {
      setError(error.message);
    }
  };

    return (
      <div className="tuile signup">
        <FormGroup controlId="email">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={handleSetEmail}
          />
        </FormGroup>
        <FormGroup controlId="name">
          <ControlLabel>Name</ControlLabel>
          <FormControl
            autoFocus
            type="name"
            value={name}
            onChange={handleSetName}
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
        <FormGroup controlId="cpassword">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={cpassword}
            onChange={handleSetCpassword}
            type="password"
          />
        </FormGroup>
        <div className='button' onClick={send}>Inscription</div>
        {error && <ErrorLogin error={error}/>}   
      </div>
    );

}

export default Signup;