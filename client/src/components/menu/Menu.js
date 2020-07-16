import React, { Fragment, useContext, useState} from 'react';
import MenuItem from './MenuItem';
import './Menu.css';
import {CredentialContext} from '../../contexts/CredentialContext';
import {RunContext} from '../../contexts/RunContext';
import {MenuContext} from '../../contexts/MenuContext';
import {Link} from 'react-router-dom';

function Menu() {

  const {isLogged} = useContext(CredentialContext);
  const {profile} = useContext(CredentialContext);
  const [run, setRun] = useContext(RunContext);
  const [menuSelected, setMenuSelected] = useContext(MenuContext);

  const handleSetMenuSelected = (menu) => {
    localStorage.setItem("menu", JSON.stringify(menu));
    setMenuSelected(menu);
  }

  return (
    <div className='menu'>      
      {isLogged && 
        <Fragment>
          {run &&
            <Link to="/run">   
              <MenuItem logo={'fas fa-play'} class={'run'} action={handleSetMenuSelected} isSelected={menuSelected} title={run.name}/>
            </Link>
          }
          <Link to="/training">   
            <MenuItem logo={'fas fa-dumbbell'} class={'training'} action={setMenuSelected} isSelected={menuSelected} title={'Entrainement'}/>
          </Link>
          {profile.level === "admin" &&
            <Fragment>
              <Link to="/statistics">  
                <MenuItem logo={'fas fa-chart-bar'} class={'statistics'} action={setMenuSelected} isSelected={menuSelected} title={'Statistiques'}/>
              </Link>
              <Link to="/admin">  
                <MenuItem logo={'fas fa-users-cog'} class={'admin'} action={setMenuSelected} isSelected={menuSelected} title={'Administration'}/>
            </Link>
          </Fragment> }
        </Fragment>
      }
    </div>
  )

}

export default Menu;