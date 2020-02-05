import React, { Component } from 'react';

const Article = (props) => {
  console.log(props, 'HI FROME ACH')
return (
  <div className="jumbotron">
      <h4 className="display-4 text-center">{props.headline}</h4>
    <div>
      <img className="img-fluid rounded mx-auto d-block" src={props.image} alt="from original article"></img>
    </div>
    <div>
      <h6 className="mx-auto">Published by: {props.publisher}</h6>
    </div>
    <div>
    <blockquote class="blockquote">
      <p className="mx-auto">{props.snippet}</p>
    </blockquote>
  </div>
  <a href={props.link}>Read Full Article</a>
  </div>
  
)
}

export default Article;