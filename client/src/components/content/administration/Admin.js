import React, {useState, Fragment } from 'react';
import './Admin.css';
import Tuile from '../Tuile';
import UsersList from './users/UsersList';
import ExercisesList from './exercises/ExercisesList';
import TrainingsList from './trainings/TrainingsList';

function Admin() {    

    const [menuChoice, setMenuChoice] = useState("menu");
    const handleSetMenuChoice = (menuChoice) => {
        setMenuChoice(menuChoice);       
    }  
    
    const usersList = 'usersList';
    const exercisesList = 'exercisesList';
    const trainingsList = 'trainingsList';

    const menu = <Fragment>
                    <div>
                        <Tuile logo={'fas fa-users'} class={usersList} title={'Utilisateurs'} active={true} onClick={() => handleSetMenuChoice(usersList)}/>
                        <Tuile logo={'fas fa-dumbbell'} class={exercisesList} title={'Exercices'} active={true} onClick={() => handleSetMenuChoice(exercisesList)}/>
                    </div>
                    <div>
                        <Tuile logo={'fas fa-running'} class={trainingsList} title={'Entrainements'} active={true} onClick={() => handleSetMenuChoice(trainingsList)}/>
                        <Tuile logo={'fas fa-wrench'} class={'none'} title={'En cours ...'} active={false}/>
                    </div>
                </Fragment>
    
    const driveMenu = () => {
        switch (menuChoice) {
          case 'menu':
            return menu;  
          case usersList:
            return <UsersList/>;  
          case exercisesList:
            return <ExercisesList/>;  
          case trainingsList:
            return <TrainingsList/>;  
          default:
            return null;
        }
    }

    return (             
         driveMenu()
    ) 
}

export default Admin;