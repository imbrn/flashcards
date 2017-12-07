import React from "react";
import styles from "./CreateDeckPage.css";
import Navbar from "../Navbar";
import TextField from "../TextField";

const CreateDeckPage = () => {
  return (
    <div>
      <Navbar title="New deck" />
      <div className={styles.content}>
        <div>
          <TextField placeholder="Example" type="primary" size="big" />
        </div>
        <div>
          <TextField placeholder="Example" type="danger" size="small" />
        </div>
        <div>
          <TextField placeholder="Example" />
        </div>
        <div>
          <TextField placeholder="Example" />
        </div>
      </div>
    </div>
  );
};

export default CreateDeckPage;
