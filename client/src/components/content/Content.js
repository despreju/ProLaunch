import React, {useContext, useState, Fragment} from 'react';

import './Content.css';
import Admin from './administration/Admin';
import Statistics from './statistics/Statistics';
import Run from './training/Run.js';

import Login from '../login/Login';
import Signup from '../login/Signup';
import UsersList from './administration/users/UsersList';
import ExercisesList from './administration/exercises/ExercisesList';
import TrainingsList from './administration/trainings/TrainingsList';
import StatisticsList from './administration/statistics/StatisticsList';
import { PrivateRoute } from "../PrivateRoute.js";
import {CredentialContext} from '../../contexts/CredentialContext';
import {RunContext} from '../../contexts/RunContext';

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
