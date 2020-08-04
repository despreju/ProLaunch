import React from 'react';
import '../css/MenuItem.css';

const MenuItem = (props) => {

  return (      
    <div className={`menuItem ${props.class === props.isSelected ? 'selected' : ''}`} data-tab={props.class} onClick={() => props.action(props.class)}>        
      <i className={props.logo} data-tab={props.class}></i>
      {props.title}
    </div>
  )  

}

export default MenuItem;
