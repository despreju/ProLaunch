import React, {useContext, useState} from 'react';
import './Content.css';
import Tuile from './Tuile';
import Admin from './administration/Admin';
import Statistics from './statistics/Statistics';
import Training from './training/Training';
import Login from '../login/Login';
import Signup from '../signup/Signup';

import {CredentialContext} from '../../contexts/CredentialContext';
import {MenuContext} from '../../contexts/MenuContext';


function Content() {

  const {isLogged} = useContext(CredentialContext);
  const {menuItemSelected} = useContext(MenuContext);
  
  const [isSignUpForm, setIsSignUpForm] = useState(false);

  const handleSetIsSignUpForm = () => {
    setIsSignUpForm(true);
  }  

  const driveMenu = () => {
    switch (menuItemSelected) {
      case '':
        return null;  
      case 'admin':
        return <Admin/>;  
      case 'statistics':
        return <Statistics/>;  
      case 'training':
        return <Training/>;  
      default:
        return null;
    }
  } 

  return (
    <div className={`content ${menuItemSelected}`}>            
      {!isLogged ? (!isSignUpForm ? <Login signUp={handleSetIsSignUpForm}/> : <Signup/>) : driveMenu()}           
    </div>
  );

}

export default Content;
