import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
class Articles extends Component {
constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: props.loggedInStatus,
      user: props.user
     };
  }
  componentWillMount() {
    this.getArticles()
  }
  getArticles = () => {
    axios.get('http://localhost:3001/articles', 
   {withCredentials: true})
    .then(response => {
      if (response.data.articles) {
        this.displayArticles()
      } else {
        console.log(response)
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  }
  handleErrors = () => {
    return (
      <div>
        <ul>
        {this.state.errors.map(error => {
        return <li key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
  }
  render() {
  return (
    <div>
    <div>
      Logged in as {this.props.user.email}
      or <Link to='/'>home</Link>
   </div>
   <div>
    {
      this.state.errors ? this.handleErrors() : null
    }
    </div>
    </div>
  );
  }
};
export default Articles;