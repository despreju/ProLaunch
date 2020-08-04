import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import API from "../../utils/API";
import '../css/Signup.css';
import ErrorLogin from '../ErrorLogin'
import loader from '../../img/91.svg';

function Signup() {

  //State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      if (!email || email.length === 0) throw new Error('Opss!');
      if (!name || name.length === 0) throw new Error('Opss!');
      if (!password || password.length === 0 || password !== cpassword) throw new Error('Opss!');
      const { data } = await API.signup({ email, name, password });
      const profile = {email:data.email, name:data.name};
      localStorage.setItem("token", data.token);
      localStorage.setItem("profile", JSON.stringify(profile));
      window.location = "/";
    } catch (error) {
      setLoading(false);
      error.response ? setError(error.response.data.text) : setError(error.message);
    }
  };

    return (
      <div className="tuile signup">
      {loading ? <img src={loader} className="loader"/> :
        <div className="form">
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleSetEmail} />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Enter email" value={name} onChange={handleSetName} />
          </Form.Group>  
          <Form.Group controlId="email">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter email" value={password} onChange={handleSetPassword} />
          </Form.Group>  
          <Form.Group controlId="email">
            <Form.Label>Confirmation password</Form.Label>
            <Form.Control type="cpassword" placeholder="Enter email" value={cpassword} onChange={handleSetCpassword} />
          </Form.Group>      
          <div className='button' onClick={send}>Inscription</div>
          {error && <ErrorLogin error={error}/>}   
        </div>}
      </div>
    );

}

export default Signup;