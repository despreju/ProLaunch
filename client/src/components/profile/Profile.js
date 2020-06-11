import React from 'react';
import './Profile.css';
import { Signup } from './signup/Signup';
import { Login } from './login/Login';
import { Dashboard } from './dashboard/Dashboard';
import API from "../../utils/API.js";

class Profile extends React.Component {

  state = {
    isLogged : API.isAuth(),
    isOpen : false,
    profile: 
    {
      name : API.getProfile().name,
      email : API.getProfile().email
    }
  }

  initializeLogin = (profile) => {
    this.setState({isLogged:true, profile:profile});
  }

  closeProfile = (e) => {
    this.setState({isOpen : false})
    e.stopPropagation();
  }

  openProfile = () => {
    this.setState({isOpen : true})
  }

  render() {
    return (
      <div className={`Profile ${this.state.isLogged ? 'logged' : 'unlogged'} ${this.state.isOpen ? 'open' : 'close'}`} onClick={this.openProfile}>        
        {!this.state.isOpen && 
          !this.state.isLogged ? 
            <i class="fas fa-sign-in-alt"></i> : 
            <i class="fas fa-user"></i>}
        {this.state.isOpen && 
          (!this.state.isLogged ? 
            <Login initializeLogin={this.initializeLogin} onClose={this.closeProfile} /> : 
            <Dashboard profile={this.state.profile} onClose={this.closeProfile}/>)}        
      </div>
    )
  }      
}


export default Profile;