import React, {useContext} from 'react';
import './Content.css';
import Element from './Element';
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
      default:
        return <Element menuSelected={menuItemSelected}/>;
    }
  } 

  return (
    <div className="content">            
      {!isLogged && <Login/>}
      {isLogged && driveMenu()}              
    </div>
  );

}

export default Content;
