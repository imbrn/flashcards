import React from "react";

const Deck = ({ deck }) => {
  return (
    <div style={{ padding: "10px" }}>
      <h1 style={{ margin: 0, padding: 0 }}>{deck.name}</h1>
      <p style={{ margin: 0, padding: 0 }}>{deck.description}</p>
    </div>
  );
};

export default Deck;
