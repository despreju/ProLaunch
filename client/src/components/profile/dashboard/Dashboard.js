import React from "react";
import { Button } from "react-bootstrap";
import './Dashboard.css';
import API from "../../../utils/API";

export class Dashboard extends React.Component {

  disconnect = () => {
    API.logout();
    window.location = "/";
  };

  render() {
    return (
      <div className="Dashboard">
        <i class="fas fa-times" onClick={this.props.onClose}></i>
        <h1>{this.props.profile.name}</h1>
        <p>{this.props.profile.email}</p>
        <Button onClick={this.disconnect} block bsSize="large" type="submit">
          <i class="fas fa-sign-out-alt"></i>Se déconnecter
        </Button>
      </div>
    );
  }
}