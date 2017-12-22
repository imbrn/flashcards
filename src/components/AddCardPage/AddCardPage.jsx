import React from "react";
import styles from "./AddCardPage.css";
import Navbar from "../Navbar";
import Container from "../ResponsiveContainer";

const AddCardPage = () => {
  return (
    <div className={styles.root}>
      <Navbar title="Add card" />
      <Container>Add card</Container>
    </div>
  );
};

export default AddCardPage;
