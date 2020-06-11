import React from 'react';
import MenuItem from './MenuItem';
import './Menu.css';

class Menu extends React.Component {

  render() {
    return (
      <div className='menu'>      
        <MenuItem title={'Entrainements'}/>
      </div>
    )
  }    
}

export default Menu;
