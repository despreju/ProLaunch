import React from 'react';
import MenuItem from './MenuItem';
import './Menu.css';

class Menu extends React.Component {

  state = {
    isOpen : false
  }

  toggleMenu = () => {
    this.setState({isOpen : !this.state.isOpen})
  }

  render() {
    return (
      <div className={`Menu ${this.state.isOpen ? 'open' : 'close'}`} onMouseEnter={this.toggleMenu} onMouseLeave={this.toggleMenu}>      
      <MenuItem title={'menu 1'} isOpen={this.state.isOpen ? 'open' : 'close'}/>
      <MenuItem title={'menu 2'} isOpen={this.state.isOpen ? 'open' : 'close'}/>
      <MenuItem title={'menu 3'} isOpen={this.state.isOpen ? 'open' : 'close'}/>
      <MenuItem title={'menu 4'} isOpen={this.state.isOpen ? 'open' : 'close'}/>
      </div>
    )
  }    
}

export default Menu;
