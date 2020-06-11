import React, { Fragment } from 'react';
import './Header.css';
import Profile from '../profile/Profile';
import logo from './logo.png';

class Header extends React.Component {

  render() {
    return (
      <div className='header'>
        <img className='logo' src={logo}/>
        {this.props.isLogged && <Profile profile={this.props.profile}/>}
      </div>
    )
  }      
}

export default Header;
