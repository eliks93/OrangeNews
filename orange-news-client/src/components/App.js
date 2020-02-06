import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './Home'
import Login from './registrations/Login';
import Register from './registrations/Register'
import Articles from './Articles'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: false,
      user: {}
     };
  }

  loginStatus = () => {
    axios.get('http://localhost:3001/logged_in', 
   {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response.data)
      } else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  }
    handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
    
  }
  handleLogout = () => {
    this.setState({
    isLoggedIn: false,
    user: {}
    })
  }
  
  render() {
    return (
      <div>
         <BrowserRouter>
          <Switch>
          <Route 
              exact path='/' 
              render={props => (
              <Home {...props} user={this.state.user} handleLogout={this.handleLogout}  loginStatus={this.loginStatus} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            <Route 
              exact path='/login' 
              render={props => (
              <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            <Route 
              exact path='/register' 
              render={props => (
              <Register {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            <Route 
              exact path='/articles' 
              render={props => (
              <Articles {...props} handleLogout={this.handleLogout} user={this.state.user} loginStatus={this.loginStatus} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;