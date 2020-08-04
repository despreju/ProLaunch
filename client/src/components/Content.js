import React, {useContext, useState, Fragment} from 'react';

import './css/Content.css';
import Admin from './Admin';
import Run from './Run.js';

import Login from './log/Login';
import Signup from './log/Signup';
import UsersList from './list/UsersList';
import ExercisesList from './list/ExercisesList';
import TrainingsList from './list/TrainingsList';
import StatisticsList from './list/RunsList';
import { PrivateRoute } from "./PrivateRoute.js";
import {CredentialContext} from '../contexts/CredentialContext';
import {RunContext} from '../contexts/RunContext';

function Content() {

  const {isLogged} = useContext(CredentialContext);
  const {profile} = useContext(CredentialContext);
  const [run, setRun] = useContext(RunContext);    

  const [isSignUpForm, setIsSignUpForm] = useState(false);

  return (    
    <div className={`content`}>        

        <PrivateRoute path="/training" exact component={() => <TrainingsList user="user"/>}/>    
        <PrivateRoute path="/statistics" exact component={() => <StatisticsList user="user"/>}/> 
        {run && <PrivateRoute path="/run" exact component={Run}/>} 
        {profile.level === "admin" &&
        <Fragment>
          <PrivateRoute path="/admin" exact component={Admin}/>
          <PrivateRoute path="/admin/trainings" exact component={() => <TrainingsList user="admin"/>}/>    
          <PrivateRoute path="/admin/exercises" exact component={ExercisesList}/> 
          <PrivateRoute path="/admin/users" exact component={UsersList}/>
          <PrivateRoute path="/admin/statistics" exact component={StatisticsList}/>
        </Fragment>
        }
        {!isLogged && (!isSignUpForm ? <Login signUp={setIsSignUpForm}/> : <Signup/>)}           
    </div>
  );

}

export default Content;
