import React, { useEffect } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import "./Home.css"

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
    

    <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
    <center>
      <div className="container secondary-color">
        <h1 className="display-4">OrangeNews</h1>
        <p className="lead">
          The Day's News As I Scrape It
        </p>
        
        <hr className="my-4" />
        { 
        props.loggedInStatus ? 
        <>
        <Link
          to="/login"
          className="btn btn-block btn-lg custom-button"
          role="button"
        >
          Login
        </Link>
        <br></br>

        <Link
          to="/register"
          className="btn btn-block btn-lg custom-button"
          role="button"
        >
          Register
        </Link> 
        </>:
        <Link
        to="/articles"
        className="btn btn-block btn-lg custom-button"
        role="button"
      >
        Show me the news
      </Link> 
        }
        
    
      </div>
      </center>
    </div>
  </div>
);
};
