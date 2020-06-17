import React, {useState, Fragment } from 'react';
import './Training.css';
import Tuile from '../Tuile';
import ExercisesList from '../administration/ExercisesList';

function Training() {

    const [menuChoice, setMenuChoice] = useState("menu");
    const handleSetMenuChoice = (menuChoice) => {
        console.log('handleSetMenu', menuChoice);
        setMenuChoice(menuChoice);       
    }  

    const exercisesList = 'exercisesList';

    const menu = <Fragment>
                    <div>
                        <Tuile logo={'fas fa-wrench'} class={exercisesList} title={'En cours ...'} active={false}/>
                        <Tuile logo={'fas fa-wrench'} class={'userList'} title={'En cours ...'} active={false}/>
                    </div>
                    <div>
                        <Tuile logo={'fas fa-wrench'} class={'userList'} title={'En cours ...'} active={false}/>
                        <Tuile logo={'fas fa-wrench'} class={'userList'} title={'En cours ...'} active={false}/>
                    </div>
                </Fragment>

    const driveMenu = () => {
        console.log('driveMenu', menuChoice)
        switch (menuChoice) {
        case 'menu':
            return menu;  
        case exercisesList:
            return null;  
        case 'statistics':
            return null;  
        case 'training':
            return null;  
        default:
            return null;
        }   
    }

    return (             
         driveMenu()
    )
 
}

export default Training;