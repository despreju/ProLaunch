import React from "react";
import './css/Dashboard.css';
import API from "../utils/API";

export class Dashboard extends React.Component {

  disconnect = () => {
    API.logout();
    window.location = "/";
  };

  render() {
    return (
      <div className="dashboard tuile">
        <h1>{this.props.profile.name}</h1>
        <p>{this.props.profile.email}</p>
      </div>
    );
  }
}

export default Dashboard;