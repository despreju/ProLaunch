import React, {useContext } from 'react';
import './Header.css';
import Profile from '../profile/Profile';
import logo from './logo.png';
import {CredentialContext} from '../../contexts/CredentialContext';

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
