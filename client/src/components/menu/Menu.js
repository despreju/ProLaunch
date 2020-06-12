import React, { Fragment } from 'react';
import MenuItem from './MenuItem';
import './Menu.css';

class Menu extends React.Component {

  state = {
    selectedMenuItem : ""
  }

  changeContent = (menu) => {
    console.log(menu);
    this.setState({selectedMenuItem : menu});
    this.props.onSelection(menu);
  } 

  render() {
    return (
      <div className='menu'>      
        {this.props.isLogged &&
          <Fragment>
            <MenuItem logo={'fas fa-dumbbell'} class={'training'} selectedMenuItem={this.state.selectedMenuItem} onSelection={this.changeContent} />
            <MenuItem logo={'fas fa-chart-bar'} class={'statistics'} selectedMenuItem={this.state.selectedMenuItem} onSelection={this.changeContent} />
            <MenuItem logo={'fas fa-users-cog'} class={'admin'} selectedMenuItem={this.state.selectedMenuItem} onSelection={this.changeContent} />
          </Fragment>
        }
      </div>
    )
  }
}

export default Menu;