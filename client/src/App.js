import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute.js";
import Header from './components/header/Header';
import Menu from './components/menu/Menu';
import Content from './components/content/Content';
import API from "./utils/API.js";
import './App.css';

class App extends Component {

  state = {
    isLogged : API.isAuth(),
    profile: 
    {
      name : API.getProfile().name,
      email : API.getProfile().email
    }
  }

  render() {
    return (
      <div className='main'>      
        <Header isLogged={this.state.isLogged} profile={this.state.profile}/>
        <Menu />
        <Content isLogged={this.state.isLogged} profile={this.state.profile}/>
      </div>
    );
  }
}

export default App;

/*         <div className="App">
        <div className="App-content">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </div> */