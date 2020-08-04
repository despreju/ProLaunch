import React, {useContext} from 'react';
import './css/Profile.css';
import API from "../utils/API.js";
import {CredentialContext} from '../contexts/CredentialContext';

function Profile() {

  const {profile} = useContext(CredentialContext);

  const disconnect = () => {
    API.logout();
    window.location = "/";
  };

  return (
    <div className='profile'>  
      <div className='userInfos'>          
        <div className='name'>{profile.name}</div>
        <div className='email'>{profile.email}</div>
      </div>
      <i className="fas fa-user"></i>
      <i className="fas fa-cog"></i>
      <i className="fas fa-sign-out-alt" onClick={disconnect}></i>
    </div>
  )
   
}

export default Profile;