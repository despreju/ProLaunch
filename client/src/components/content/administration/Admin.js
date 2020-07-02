import React, {useState, Fragment } from 'react';
import './Admin.css';
import Tuile from '../Tuile';
import {Link} from 'react-router-dom';
import {Dropdown} from "react-bootstrap";
function Admin() {    

    const [menuChoice, setMenuChoice] = useState("menu");
    
    const usersList = 'usersList';
    const exercisesList = 'exercisesList';
    const trainingsList = 'trainingsList';

    const menu = <Fragment>
                    <div>
                      <Link to="/admin/users">
                        <Tuile logo={'fas fa-users'} class={usersList} title={'Utilisateurs'} active={true} onClick={() => setMenuChoice(usersList)}/>
                      </Link>
                        <Link to="/admin/exercises"><Tuile logo={'fas fa-dumbbell'} class={exercisesList} title={'Exercices'} active={true} onClick={() => setMenuChoice(exercisesList)}/></Link>
                    </div>
                    <div>
                    <Link to="/admin/trainings"><Tuile logo={'fas fa-running'} class={trainingsList} title={'Entrainements'} active={true} onClick={() => setMenuChoice(trainingsList)}/></Link>
                    <Link to="/"><Tuile logo={'fas fa-wrench'} class={'none'} title={'En cours ...'} active={false}/></Link>
                    </div>
                </Fragment>

    return (            
      <Fragment>
        {menu} 
      </Fragment>
    ) 
}

export default Admin;