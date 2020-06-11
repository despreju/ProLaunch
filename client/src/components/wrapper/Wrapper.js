import React from 'react';
import './Wrapper.css';
import Menu from '../menu/Menu';
import Content from '../content/Content';

class Wrapper extends React.Component {

  render() {
    return (
      <div className="Wrapper">      
        <Menu />
        <Content />
      </div>
    )
  }     
}

export default Wrapper;
