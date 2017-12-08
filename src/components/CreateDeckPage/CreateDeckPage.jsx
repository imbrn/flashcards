import React from "react";
import styles from "./CreateDeckPage.css";
import Navbar from "../Navbar";
import Container from "../ResponsiveContainer";
import TextField from "../TextField";
import TextArea from "../TextArea";
import Button from "../Button";

const CreateDeckPage = () => {
  return (
    <div>
      <Navbar title="New deck" />
      <Container className={styles.content}>
        <div className={styles.form}>
          <div className={styles.row}>
            <TextField placeholder="Name" size="big" className={styles.input} />
          </div>
          <div className={styles.row}>
            <TextArea
              placeholder="Description"
              size="medium"
              rows={2}
              className={styles.input}
            />
          </div>
          <div className={styles.row}>
            <TextField
              size="small"
              placeholder="Front type (Ex: English)"
              className={styles.input}
            />
          </div>
          <div className={styles.row}>
            <TextField
              size="small"
              placeholder="Back type (Ex: Português)"
              className={styles.input}
            />
          </div>
          <div className={styles.buttons}>
            <Button type="primary" size="big" className={styles.button}>
              Create
            </Button>
            <Button size="big" className={styles.button}>
              Cancel
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CreateDeckPage;
