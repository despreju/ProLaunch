import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import API from "../../utils/API";
import './Login.css';
import ErrorLogin from './ErrorLogin'
import loader from '../../91.svg';

const Login = (props) => {

  //State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //Handle
  const handleSetEmail = (event) => {
    setEmail(event.target.value);
  }  
  const handleSetPassword = (event) => {
    setPassword(event.target.value);
  }  

  //Component
  const send = async () => {
    try {
      setLoading(true);
      if (!email || email.length === 0) throw new Error('Opss!');
      if (!password || password.length === 0) throw new Error('Opss!');
      const { data } = await API.login(email, password);      
      const profile = {email:data.email, name:data.name, level:data.level};
      localStorage.setItem("token", data.token);
      localStorage.setItem("profile", JSON.stringify(profile));
      window.location = "/";
    } catch (error) {
      setLoading(false);
      error.response ? setError(error.response.data.text) : setError(error.message);
    }
  };

  const signUp = () => {
    console.log('signUp');
      props.signUp(true);
  }

  return (         
    <div className="tuile login">      
      {loading ? <img src={loader} className="loader"/> :
      <div className="form">
        <Form>
          <Form.Group controlId="email">
            <Form.Label>Name</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleSetEmail} />
          </Form.Group>  
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={password} onChange={handleSetPassword} />
          </Form.Group>  
        </Form>
        <div className='button' onClick={send}>Connexion</div>
        {error && <ErrorLogin error={error}/>}            
        <div className="signupButton" onClick={signUp}>Je n'ai pas de compte</div>
      </div>}
    </div>
  );

}

export default Login;