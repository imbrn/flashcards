import React from "react";
import PropTypes from "prop-types";
import { OrderedMap } from "immutable";
import { connect } from "react-redux";

const AppPage = ({ decks }) => {
  return (
    <div>
      <div>AppPage</div>
      {decks.loadingState}
    </div>
  );
};

AppPage.propTypes = {
  decks: PropTypes.objectOf(OrderedMap).isRequired,
};

const mapStateToProps = (state) => {
  return {
    decks: state.decks,
  };
};

export default connect(mapStateToProps)(AppPage);
