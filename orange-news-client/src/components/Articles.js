import React, { Component } from 'react';
import {Link} from 'react-router-dom'
class Articles extends Component {
constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: props.loggedInStatus,
      user: props.user
     };
  }
  render() {
  return (
    <div>
      Logged in as {this.props.user.email}
      or <Link to='/'>home</Link>
   </div>
  );
  }
};
export default Articles;