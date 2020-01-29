import React, { Component } from 'react';

const Article = (props) => {
  console.log(props, 'HI FROME ACH')
return (
  <div className="vw-25 vh-25 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
      <h4 className="display-4">{props.headline}</h4>
    </div>
    <div>
      <h6>{props.publisher}</h6>
    </div>
    <div>
      <p>{props.snippet}</p>
  </div>
  <a href={props.link}>Read Full Article</a>
  </div>
  </div>
)
}

export default Article;