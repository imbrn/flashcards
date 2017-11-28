import React from "react";
import Button from "../Button";

const DecksTopbarActions = () => {
  return (
    <div>

      <Button color="tertiary">
        <span className="icon"><i className="fa fa-search" /></span>
        Search
      </Button>

      <Button color="tertiary">
        <span className="icon"><i className="fa fa-plus" /></span>
        Create deck
      </Button>

    </div>
  );
};

export default DecksTopbarActions;
