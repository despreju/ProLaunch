import React, { useState } from 'react';
import { Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute.js";
import './App.css';

//Components
import Header from './components/header/Header';
import Menu from './components/menu/Menu';
import Content from './components/content/Content';

//Contexts
import CredentialContextProvider from './contexts/CredentialContext';
import MenuContextProvider from './contexts/MenuContext';


function App() {

  const [menuSelected, setMenuSelected] = useState("");

  const handleSetMenuSelected = (menu) => {
    setMenuSelected(menu);
  }

  return (
    <div className='main'>      
      <CredentialContextProvider>
        <Header/>
        <MenuContextProvider>
          <Menu setMenuSelected={handleSetMenuSelected}/>
          <Content menuSelected={menuSelected}/>
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