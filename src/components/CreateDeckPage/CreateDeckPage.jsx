import React from "react";
import styles from "./CreateDeckPage.css";
import Navbar from "../Navbar";
import Container from "../ResponsiveContainer";
import Box from "../Box";
import TextField from "../TextField";
import TextArea from "../TextArea";
import Button from "../Button";

const CreateDeckPage = () => {
  return (
    <div>
      <Navbar title="New deck" />
      <Container className={styles.content}>
        <Box elevation={2} className={styles.form}>
          <div className={styles.row}>
            <label>
              Name
              <TextField
                name="name"
                placeholder="What's the deck name?"
                className={styles.input}
                autoFocus
              />
            </label>
          </div>
          <div className={styles.row}>
            <label>
              Description
              <TextArea
                name="description"
                placeholder="How do you describe this deck?"
                size="medium"
                rows={2}
                className={styles.input}
              />
            </label>
          </div>
          <div className={styles.row}>
            <label>
              Cards front type
              <TextField
                name="front"
                size="small"
                placeholder="What' the cards front type? Ex: English"
                className={styles.input}
              />
            </label>
          </div>
          <div className={styles.row}>
            <label>
              Cards back type
              <TextField
                name="back"
                size="small"
                placeholder="What's the back type? Ex: Português"
                className={styles.input}
              />
            </label>
          </div>
          <div className={styles.buttons}>
            <Button
              highlighted
              type="primary"
              size="big"
              className={styles.button}
            >
              Create
            </Button>
            <Button size="big" className={styles.button}>
              Cancel
            </Button>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default CreateDeckPage;
