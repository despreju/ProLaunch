import React from 'react';
import './Content.css';
import Element from './Element';
import Login from '../login/Login';
import Dashboard from '../dashboard/Dashboard';
import API from "../../utils/API.js";


class Content extends React.Component {

  initializeLogin = (profile) => {
    this.setState({isLogged:true, profile:profile});
  }

  driveMenu = (menu) => {
    switch (menu) {
      case '':
        return null;    
      default:
        return <Element menuSelected={this.props.menuSelected}/>;
    }
  }

  render() {
    return (
      <div className="content">       
          {this.props.isLogged ? 
            this.driveMenu(this.props.menuSelected) :
            <Login/>
          } 
      </div>
    );
  }

}
export default Content;
