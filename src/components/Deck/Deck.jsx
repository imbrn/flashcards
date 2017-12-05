import React from "react";
import styles from "./Deck.css";
import Dropdown from "../Dropdown";

const Deck = ({ model }) => {
  return (
    <div>
      <Dropdown actions={[
        { icon: "fa fa-sticky-note-o", text: "Manage cards", tag: "a", href: "#" },
        { separator: true, },
        { icon: "fa fa-pencil", text: "Edit" },
        { icon: "fa fa-trash-o", text: "Delete", danger: true },
      ]}/>
      <span>{model.name}</span>
    </div>
  );
};

export default Deck;
