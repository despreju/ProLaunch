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

  render() {
    return (
      <div className="content">      
        {this.props.isLogged ? <Dashboard profile={this.props.profile}/> : <Login/>}
      </div>
    );
  }

}
export default Content;
