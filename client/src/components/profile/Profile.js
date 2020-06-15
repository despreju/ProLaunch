import React, {useContext} from 'react';
import './Profile.css';
import API from "../../utils/API.js";
import {CredentialContext} from '../../contexts/CredentialContext';

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
      <i class="fas fa-user"></i>
      <i class="fas fa-cog"></i>
      <i class="fas fa-sign-out-alt" onClick={disconnect}></i>
    </div>
  )
   
}

export default Profile;