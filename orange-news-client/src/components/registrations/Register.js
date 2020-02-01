import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: ''
     };
  }
handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };
handleSubmit = (event) => {
    event.preventDefault()
    const {username, email, password, password_confirmation} = this.state
    let user = {
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }
axios.post('http://localhost:3001/users', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.status === 'created') {
        this.props.handleLogin(response.data)
        this.redirect()
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  };
redirect = () => {
    this.props.history.push('/articles')
  }
handleErrors = () => {
    return (
      <div>
        <ul>{this.state.errors.map((error) => {
          return <li>{error}</li>
        })}
        </ul> 
      </div>
    )
  }
render() {
    const {username, email, password, password_confirmation} = this.state
return (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
  <div className="jumbotron jumbotron-fluid bg-transparent">
  <div className="container secondary-color">
  <center>
  <h1 className="display-4">OrangeNews</h1>
  <p className="lead">
    Please Register Below
  </p>
  <hr className="my-4" />
  </center>
  <form onSubmit={this.handleSubmit}>
    <div class="form-group">
    <label for="exampleInputUsername1">Username</label>
    <input
      class="form-control"
      placeholder="username"
      type="text"
      name="username"
      value={username}
      onChange={this.handleChange}
    />
    <label for="exampleInputEmail1">Email Address</label>
    <input
      class="form-control"
      placeholder="email"
      type="text"
      name="email"
      value={email}
      onChange={this.handleChange}
    />
    <label for="exampleInputPassword1">Password</label>
    <input
      class="form-control"
      placeholder="password"
      type="password"
      name="password"
      value={password}
      onChange={this.handleChange}
    />
     <label for="exampleInputPasswordConfirmation1">Password Confirmation</label>
    <input
      class="form-control"
      placeholder="confirm password"
      type="password"
      name="password_confirmation"
      value={password_confirmation}
      onChange={this.handleChange}
    />
    </div>
    <div>
    {
      this.state.errors ? this.handleErrors() : null
    }
  </div>
    <button className="btn btn-block btn-lg custom-button" placeholder="submit" type="submit">
      Submit
    </button>
    <br></br>

    <div>
    <Link
      to="/login"
      className="btn btn-block btn-lg custom-button"
      role="button"
    >
      Login
  </Link>
    </div>
    
  </form>
  </div>
  </div>
</div>
    );
  }
}
export default Register;