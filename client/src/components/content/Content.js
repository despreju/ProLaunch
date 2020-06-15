import React, {useContext} from 'react';
import './Content.css';
import Element from './Element';
import Admin from './administration/Admin';
import Statistics from './statistics/Statistics';
import Training from './training/Training';
import Login from '../login/Login';

import {CredentialContext} from '../../contexts/CredentialContext';
import {MenuContext} from '../../contexts/MenuContext';

function Content() {

  const {isLogged} = useContext(CredentialContext);
  const {menuItemSelected} = useContext(MenuContext);
  
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
      {!isLogged && <Login/>}
      {isLogged && driveMenu()}              
    </div>
  );

}

export default Content;
