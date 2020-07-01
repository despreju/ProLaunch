import React, { Fragment, useContext} from 'react';
import MenuItem from './MenuItem';
import './Menu.css';
import {CredentialContext} from '../../contexts/CredentialContext';
import {Link} from 'react-router-dom';

function Menu() {

  const {isLogged} = useContext(CredentialContext);

  return (
    <div className='menu'>      
      {isLogged && 
        <Fragment>
          <Link to="/training">   
            <MenuItem logo={'fas fa-dumbbell'} class={'training'} title={'Entrainement'}/>
          </Link>
          <Link to="/statistics">  
            <MenuItem logo={'fas fa-chart-bar'} class={'statistics'} title={'Statistiques'}/>
          </Link>
          <Link to="/admin">  
            <MenuItem logo={'fas fa-users-cog'} class={'admin'} title={'Administration'}/>
          </Link>
        </Fragment>
      }
    </div>
  )

}

export default Menu;