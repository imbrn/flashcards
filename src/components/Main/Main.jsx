import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { userSelectors } from "../../user";
import AppPage from "../AppPage";
import SigningInPage from "../SigningInPage";

class Main extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    if (userSelectors.isSignedIn(this.props.user)) {
      return <AppPage />;
    } else {
      return <SigningInPage />;
    }
  }
}

Main.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default withRouter(connect(mapStateToProps)(Main));
