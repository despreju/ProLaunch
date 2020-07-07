import React, {useContext, useState} from 'react';

import './Content.css';
import Admin from './administration/Admin';
import Statistics from './statistics/Statistics';
import Training from './training/Training';
import Login from '../login/Login';
import Signup from '../login/Signup';
import UsersList from './administration/users/UsersList';
import ExercisesList from './administration/exercises/ExercisesList';
import TrainingsList from './administration/trainings/TrainingsList';
import { PrivateRoute } from "../PrivateRoute.js";
import {CredentialContext} from '../../contexts/CredentialContext';

function Content() {

  const {isLogged} = useContext(CredentialContext);
  
  const [isSignUpForm, setIsSignUpForm] = useState(false);

  return (    
    <div className={`content`}>        
        <PrivateRoute path="/training" exact component={() => <TrainingsList user="user"/>}/>    
        <PrivateRoute path="/statistics" exact component={Statistics}/> 
        <PrivateRoute path="/admin" exact component={Admin}/>
        <PrivateRoute path="/admin/trainings" exact component={() => <TrainingsList user="admin"/>}/>    
        <PrivateRoute path="/admin/exercises" exact component={ExercisesList}/> 
        <PrivateRoute path="/admin/users" exact component={UsersList}/>
        {!isLogged && (!isSignUpForm ? <Login signUp={setIsSignUpForm}/> : <Signup/>)}           
    </div>
  );

}

export default Content;
