import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

const DecksPage = () => {
  return (
    <div>
      <Navbar title="My decks" actions={[
        { icon: "fa fa-search", text: "Search", tertiary: true },
        { icon: "fa fa-plus", text: "Create deck", tertiary: true, tag: Link, to: "/decks/create" },
      ]} />
      DecksPage
    </div>
  );
};

export default DecksPage;
