import React from "react";
import PropTypes from "prop-types";
import Navbar from "../Navbar";

const NotFoundPage = ({ location }) => {
  return (
    <div>
      <Navbar title="Page not found" />
      <div>
        <h1>404</h1>
        <h2>The page {location.pathname} was not found</h2>
      </div>
    </div>
  );
};

NotFoundPage.propTypes = {
  location: PropTypes.object.isRequired
};

export default NotFoundPage;
