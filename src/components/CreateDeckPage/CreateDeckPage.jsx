import React from "react";
import styles from "./CreateDeckPage.css";
import Navbar from "../Navbar";
import TextArea from "../TextArea";

const CreateDeckPage = () => {
  return (
    <div>
      <Navbar title="New deck" />
      <div className={styles.content}>
        <div>
          <TextArea placeholder="Example" type="primary" size="large" />
        </div>
        <div>
          <TextArea placeholder="Example" type="danger" size="small" />
        </div>
        <div>
          <TextArea placeholder="Example" />
        </div>
        <div>
          <TextArea placeholder="Example" />
        </div>
      </div>
    </div>
  );
};

export default CreateDeckPage;
