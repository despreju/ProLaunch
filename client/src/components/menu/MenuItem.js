import React from 'react';
import './MenuItem.css';

class MenuItem extends React.Component {

  render() {
    return (
      <div className='menuItem' onClick={() => {console.log('menu item')}}>        
        {this.props.title}
      </div>
    )
  }    
}

export default MenuItem;
