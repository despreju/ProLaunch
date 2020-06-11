import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { Dashboard } from "./components/profile/dashboard/Dashboard.js";
import { Login } from "./components/profile/login/Login.js";
import { Signup } from "./components/profile/signup/Signup.js";
import { PrivateRoute } from "./components/PrivateRoute.js";
import Header from './components/header/Header';
import Wrapper from './components/wrapper/Wrapper'
import Footer from './components/footer/Footer'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='main'>
        <Header />
        <Wrapper />
      </div>
/*         <div className="App">
        <div className="App-content">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </div> */
    );
  }
}

export default App;
