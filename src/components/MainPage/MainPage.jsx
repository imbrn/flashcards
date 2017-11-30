import React from "react";
import styles from "./MainPage.m.css";
import Topbar from "../Topbar";
import Content from "../Content";

const MainPage = () => {
  return (
    <div className={styles.page}>
      <Topbar />
      <Content />
    </div>
  );
};

export default MainPage;
