import React from 'react';
import './MenuItem.css';

class MenuItem extends React.Component {

  render() {
    return (
      <div className={`MenuItem ${this.props.isOpen}`} onClick={() => {console.log('menu item')}}>        
        <p>{this.props.title}</p>
      </div>
    )
  }    
}

export default MenuItem;
