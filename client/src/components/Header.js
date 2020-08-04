import React, {useContext } from 'react';
import './css/Header.css';
import Profile from './Profile';
import logo from '../img/logo.png';
import {CredentialContext} from '../contexts/CredentialContext';

function Header()  {
  
  const {isLogged, profile} = useContext(CredentialContext);

  return (
    <div className='header'>
      <img className='logo' src={logo}/>
      {isLogged && <Profile profile={profile}/>}
    </div>
  )
     
}

export default Header;
