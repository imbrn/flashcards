import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ThemeProvider} from "styled-components";
import theme from "../commons/defaultTheme";
import { authSelectors } from "../../auth";
import AppPage from "../AppPage";
import SigningInPage from "../SigningInPage";

const Main = ({ auth }) => {

  const renderPage = () => {
    if (authSelectors.isSigningIn(auth)) {
      return <SigningInPage />;
    } else {
      return <AppPage />;
    }
    // TODO: add support for sign in fail page
  };

  return (
    <ThemeProvider theme={theme}>
      { renderPage() }
    </ThemeProvider>
  );

};

Main.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default withRouter(connect(mapStateToProps)(Main));
