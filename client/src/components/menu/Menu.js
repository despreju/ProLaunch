import React, { Fragment, useContext} from 'react';
import MenuItem from './MenuItem';
import './Menu.css';
import {CredentialContext} from '../../contexts/CredentialContext';

function Menu() {

  const {isLogged} = useContext(CredentialContext);

  return (
    <div className='menu'>      
      {isLogged &&
        <Fragment>
          <MenuItem logo={'fas fa-dumbbell'} class={'training'} title={'Entrainement'}/>
          <MenuItem logo={'fas fa-chart-bar'} class={'statistics'} title={'Statistiques'}/>
          <MenuItem logo={'fas fa-users-cog'} class={'admin'} title={'Administration'}/>
        </Fragment>
      }
    </div>
  )

}

export default Menu;