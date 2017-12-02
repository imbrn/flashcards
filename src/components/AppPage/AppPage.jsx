import React from "react";
import { connect } from "react-redux";

const AppPage = ({ decks }) => {
  return (
    <div>
      <div>AppPage</div>
      {decks.loadingState}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    decks: state.decks,
  }
};

export default connect(mapStateToProps)(AppPage);
