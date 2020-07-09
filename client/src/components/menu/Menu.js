import React, { Fragment, useContext, useState} from 'react';
import MenuItem from './MenuItem';
import './Menu.css';
import {CredentialContext} from '../../contexts/CredentialContext';
import {Link} from 'react-router-dom';

function Menu() {

  const {isLogged} = useContext(CredentialContext);
  const {profile} = useContext(CredentialContext);

  const [isSelected, setIsSelected] = useState("");

  return (
    <div className='menu'>      
      {isLogged && 
        <Fragment>
          <Link to="/training">   
            <MenuItem logo={'fas fa-dumbbell'} class={'training'} action={setIsSelected} isSelected={isSelected} title={'Entrainement'}/>
          </Link>
          {profile.level === "admin" &&
            <Fragment>
              <Link to="/statistics">  
                <MenuItem logo={'fas fa-chart-bar'} class={'statistics'} action={setIsSelected} isSelected={isSelected} title={'Statistiques'}/>
              </Link>
              <Link to="/admin">  
                <MenuItem logo={'fas fa-users-cog'} class={'admin'} action={setIsSelected} isSelected={isSelected} title={'Administration'}/>
            </Link>
          </Fragment> }
        </Fragment>
      }
    </div>
  )

}

export default Menu;