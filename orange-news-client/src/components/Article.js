import React, { Component } from 'react';

const Article = (props) => {
  console.log(props, 'HI FROME ACH')
return (
  <div>
    <div>
      <h4>{props.headline}</h4>
    </div>
    <div>
      <h6>{props.publisher}</h6>
    </div>
    <div>
      <p>{props.snippet}</p>
  </div>
  <a href={props.link}>Read Full Article</a>
  </div>
)
}

export default Article;