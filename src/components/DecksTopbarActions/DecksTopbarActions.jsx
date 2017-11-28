import React from "react";
import Button from "../Button";

const DecksTopbarActions = () => {
  return (
    <div>

      <Button color="tertiary" size="lg" icon="fa fa-search">
        Search
      </Button>

      <Button color="tertiary" size="lg" icon="fa fa-plus">
        Create deck
      </Button>

    </div>
  );
};

export default DecksTopbarActions;
