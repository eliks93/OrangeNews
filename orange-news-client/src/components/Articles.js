import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import Article from './Article'
class Articles extends Component {
constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: props.loggedInStatus,
      user: props.user,
      articles: []
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
        console.log(response.data.articles[0])
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
   return (
     <ul>
       {data[0].map(function(article) {
         return (
          <Article 
          headline={article.headline} 
          snippet={article.snippet} 
          image={article.image} 
          link={article.link} 
          publisher={article.publisher}>
          </Article>
         )
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
    <div>
    <div>
      Logged in as {this.props.user.email}
      or <Link to='/'>home</Link>
   </div>
   <div>
    {
      this.state.errors ? this.handleErrors() : this.displayArticles()
    }
    </div>
    </div>
  );
  }
};
export default Articles;