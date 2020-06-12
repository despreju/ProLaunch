import React from 'react';
import './Element.css';

class Element extends React.Component {

  render() {
    return (
      <div className='element'>                
        {this.props.menuSelected}
      </div>
    )
  }      
}

export default Element;
