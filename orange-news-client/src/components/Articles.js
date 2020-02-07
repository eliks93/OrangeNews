import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import Article from './Article'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

class Articles extends Component {
constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: props.loggedInStatus,
      user: props.user,
      articles: [],
      'The BBC': true,
      'The New York Times': true,
      'The CBC': true,
      'CNN': true
     };
     this.handleChange = this.handleChange.bind(this);
  }

  handleClick = () => {
    axios.delete('http://localhost:3001/logout', {withCredentials: true})
    .then(response => {
      this.props.handleLogout()
      this.props.history.push('/')
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
    this.getArticles()
    this.props.loginStatus() 
    if(!this.props.loginStatus) {
      this.props.history.push('/')
    }

  }
  handleChange(evt) {
    const target = evt.target
    const checked = target.checked
    const publisher = target.name
    this.setState({ [publisher]: checked});
  }

  getArticles = () => {
    axios.get('http://localhost:3001/articles', 
   {withCredentials: true})
    .then(response => {
      if (response.data.articles) {
        this.setState({
          articles: response.data.articles
        })
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  }
  displayArticles = () => {
    let data = [this.state.articles]
    let publishers = this.state
   return (
     <ul>
       {data[0].map(function(article) {
        if(publishers[article.publisher]) {
          return(
          <Article
          key={article.id} 
          headline={article.headline} 
          snippet={article.snippet} 
          image={article.image} 
          link={article.link} 
          publisher={article.publisher}>
          </Article>
          )
        }
          return null 
       })}
     </ul>
   )
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
    <>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
     <Navbar.Brand className="navbar-brand" href="/">OrangeNews</Navbar.Brand>
     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
     <Navbar.Collapse id="responsive-navbar-nav">
      <Nav.Item className="nav-link">Logged in as {this.props.user.email}</Nav.Item>
    <NavDropdown id="collasible-nav-dropdown" title="Preferences">
      <Form.Check checked={this.state['The BBC']} onChange={this.handleChange} label="The BBC" type='checkbox' id='default-checkbox-1' name='The BBC' />
      <Form.Check name='The CBC' checked={this.state['The CBC']} onChange={this.handleChange} label="The CBC" type="checkbox" id='default-checkbox-2' />
      <Form.Check name='CNN' checked={this.state['CNN']} onChange={this.handleChange} label="CNN" type="checkbox" id='default-checkbox-3' />
      <Form.Check name='The New York Times' checked={this.state['The New York Times']} onChange={this.handleChange} label="The NYT" type="checkbox" id='default-checkbox-4' />
    </NavDropdown>
    
   <Link className="ml-auto btn nav-link custom-button" to='/logout' onClick={this.handleClick}>Log Out</Link>
   </Navbar.Collapse>
   </Navbar>
   <div className="vw-10 vh-10 primary-color d-flex align-items-center justify-content-center">
   <div className="jumbotron jumbotron-fluid bg-transparent">
   <div className="container secondary-color">

    {
      this.state.errors ? this.handleErrors() : this.displayArticles()
    }
    </div>
    </div>
    </div>
    </>
  );
  }
};
export default Articles;