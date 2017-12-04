import React from "react";
import Navbar from "../Navbar";

const DecksPage = () => {
  return (
    <div>
      <Navbar title="My decks" actions={[
        { icon: "fa fa-search", text: "Search", tertiary: true },
        { icon: "fa fa-plus", text: "Create deck", tertiary: true },
      ]} />
      DecksPage
    </div>
  );
};

export default DecksPage;
