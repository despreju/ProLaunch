import React, {useState, Fragment } from 'react';
import './Admin.css';
import Tuile from '../Tuile';
import UsersList from '../administration/UsersList';

function Admin() {    

    const [menuChoice, setMenuChoice] = useState("menu");
    const handleSetMenuChoice = (menuChoice) => {
        console.log('handleSetMenu', menuChoice);
        setMenuChoice(menuChoice);       
    }  
    
    const userList = 'userList';

    const menu = <Fragment>
                    <div>
                        <Tuile logo={'fas fa-users'} class={userList} title={'Utilisateurs'} active={true} onClick={() => handleSetMenuChoice(userList)}/>
                        <Tuile logo={'fas fa-wrench'} class={'none'} title={'En cours ...'} active={false}/>
                    </div>
                    <div>
                        <Tuile logo={'fas fa-wrench'} class={'none'} title={'En cours ...'} active={false}/>
                        <Tuile logo={'fas fa-wrench'} class={'none'} title={'En cours ...'} active={false}/>
                    </div>
                </Fragment>
    
    const driveMenu = () => {
        console.log('driveMenu', menuChoice)
        switch (menuChoice) {
          case 'menu':
            return menu;  
          case userList:
            return <UsersList/>;  
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

export default Admin;