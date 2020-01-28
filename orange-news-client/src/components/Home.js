import React, { useEffect } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'

export default function Home(props) {
  if(props.loggedInStatus) {
    props.history.push('/articles')
  }
  const handleClick = () => {
    axios.delete('http://localhost:3001/logout', {withCredentials: true})
    .then(response => {
      props.handleLogout()
      props.history.push('/')
    })
    .catch(error => console.log(error))
  }

  return (
    
    <div>
      {/* { props.loggedInStatus ? } */}
      <Link to='/login'>Log In</Link>
      <br></br>
      <Link to='/register'>Sign Up</Link>
      <br></br>
      { 
        props.loggedInStatus ? 
        <Link to='/logout' onClick={handleClick}>Log Out</Link> : 
        null
      }
    </div>
  );
};
