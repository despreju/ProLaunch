import React from 'react';
import './Element.css';
import API from "../../utils/API.js";

class Element extends React.Component {

  state = {
    usersList : []
  } 

  async componentDidMount() {
    const {data} = await API.getAllUsers();
    setTimeout(() => {
      this.setState({usersList: data});
    }, 1000);
    
  }

  render() {
    return (      
      <div className='element'>      
       {this.state.usersList.map((user) => <p key={user.id}>{user.name} {user.email}</p>)}     
      </div>
    )
  }      
}

export default Element;
