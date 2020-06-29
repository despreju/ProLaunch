import React, {useContext} from 'react';
import './MenuItem.css';
import {MenuContext} from '../../contexts/MenuContext';

const MenuItem = (props) => {

  const {menuItemSelected} = useContext(MenuContext);
  const {handleSetMenuItemSelected} = useContext(MenuContext);

  return (      
    <div className={`menuItem ${props.class} ${props.class === menuItemSelected ? 'selected' : ''}`} data-tab={props.class} onClick={handleSetMenuItemSelected}>        
      <i className={props.logo}></i>
      {props.title}
    </div>
  )  

}

export default MenuItem;
