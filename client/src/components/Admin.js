import React, {useState, Fragment } from 'react';
import './css/Admin.css';
import Tuile from './Tuile';
import {Link} from 'react-router-dom';

function Admin() {    

    const usersList = 'usersList';
    const exercisesList = 'exercisesList';
    const trainingsList = 'trainingsList';
    const statisticsList = 'statisticsList';

    const menu = <Fragment>
                    <div>
                      <Link to="/admin/users">
                        <Tuile logo={'fas fa-users'} class={usersList} title={'Utilisateurs'} active={true}/>
                      </Link>
                      <Link to="/admin/exercises">
                        <Tuile logo={'fas fa-dumbbell'} class={exercisesList} title={'Exercices'} active={true}/>
                      </Link>
                    </div>
                    <div>
                      <Link to="/admin/trainings">
                        <Tuile logo={'fas fa-running'} class={trainingsList} title={'Entrainements'} active={true}/>
                      </Link>
                      <Link to="/admin/statistics">
                        <Tuile logo={'fas fa-chart-bar'} class={statisticsList} title={'Statistiques'} active={true}/>
                      </Link>
                    </div>
                </Fragment>

    return (            
      <Fragment>
        {menu} 
      </Fragment>
    ) 
}

export default Admin;