import React from 'react';
import './MenuItem.css';

class MenuItem extends React.Component {

  changeContent = () => {   
    this.props.onSelection(this.props.class);    
  }  

  render() {
    return (      
      <div className={`menuItem ${this.props.class} ${this.props.class == this.props.selectedMenuItem ? 'selected' : ''}`} onClick={this.changeContent}>        
        <i class={this.props.logo}></i>
        {this.props.class}
      </div>
    )
  }    
}

export default MenuItem;
