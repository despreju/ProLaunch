import React, { useState } from 'react';
import './App.css';

//Components
import Header from './components/header/Header';
import Menu from './components/menu/Menu';
import Content from './components/content/Content';
import {BrowserRouter as Router} from 'react-router-dom';

//Contexts
import CredentialContextProvider from './contexts/CredentialContext';
import RunContextProvider from './contexts/RunContext';
import MenuContextProvider from './contexts/MenuContext';

function App() {

  return (
    <div className='main'>      
      <CredentialContextProvider>
        <MenuContextProvider>
          <RunContextProvider>
            <Header/>
            <Router>
              <Menu/>
              <Content/>
            </Router>
          </RunContextProvider>
        </MenuContextProvider>
      </CredentialContextProvider>
    </div>
  );
  
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