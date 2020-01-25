import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <center>
      <div className="container secondary-color">
        <h1 className="display-4">Orange News</h1>
        <p className="lead">
          Today's News As It Happens
        </p>
        <hr className="my-4" />
        <Link
          to="/news"
          className="btn btn-lg custom-button"
          role="button"
        >
          View the news
        </Link>
        <Link
          to="/register"
          className="btn btn-lg custom-button"
          role="button"
        >
          Register
        </Link>
      </div>
      </center>
    </div>
  </div>
);