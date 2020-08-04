import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import API from "../../utils/API";
import '../css/Login.css';
import ErrorLogin from '../ErrorLogin'
import loader from '../../img/91.svg';

const Login = (props) => {

  //State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mailAnimated, setMailAnimated] = useState("");
  const [passwordAnimated, setPasswordAnimated] = useState("");

  //Handle
  const handleSetEmail = (event) => {
    setEmail(event.target.value);
    if (event.target.value !== "") setMailAnimated("animated");
    else setMailAnimated("");
  }  
  const handleSetPassword = (event) => {
    setPassword(event.target.value);
    if (event.target.value !== "") setPasswordAnimated("animated");
    else setPasswordAnimated("");
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

  const isEmpty = (event) => {
    console.log("is Empty");
  }

  return (         
    <div className="login">      
      {loading ? <img src={loader} className="loader"/> :
      <div className="form">
        <h2><strong>Identifiez</strong>-vous</h2>
       
        <div className={`formGroup ${mailAnimated}`}>
            <label>Utilisateur</label>
            <input type="text" value={email} onChange={handleSetEmail} />
        </div>
        <div className={`formGroup ${passwordAnimated}`}>
            <label>Mot de passe</label>
            <input type="password" value={password} onChange={handleSetPassword} />
        </div>
        <div className='button' onClick={send}>Connexion</div>
        {error && <ErrorLogin error={error}/>}            
        <div className="signupButton" onClick={signUp}>Je n'ai pas de compte</div>
      </div>}
    </div>
  );

}

export default Login;