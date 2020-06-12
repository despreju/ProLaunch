import React from 'react';
import './Profile.css';
import API from "../../utils/API.js";

class Profile extends React.Component {

  disconnect = () => {
    API.logout();
    window.location = "/";
  };

  render() {
    return (
      <div className='profile'>  
        <div className='userInfos'>          
          <div className='name'>{this.props.profile.name}</div>
          <div className='email'>{this.props.profile.email}</div>
        </div>
        <i class="fas fa-user"></i>
        <i class="fas fa-cog"></i>
        <i class="fas fa-sign-out-alt" onClick={this.disconnect}></i>
      </div>
    )
  }      
}

export default Profile;