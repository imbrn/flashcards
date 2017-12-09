import React from "react";
import PropTypes from "prop-types";
import styles from "./CreateDeckPage.css";
import Navbar from "../Navbar";
import Container from "../ResponsiveContainer";
import Box from "../Box";
import TextField from "../TextField";
import TextArea from "../TextArea";
import Button from "../Button";
import { withFormik } from "formik";
import validation, { required, maxLength } from "../../validation";

const CreateDeckPage = () => {
  return (
    <div>
      <Navbar title="New deck" />
      <Container className={styles.content}>
        <Box elevation={2} className={styles.form}>
          <FormikForm />
        </Box>
      </Container>
    </div>
  );
};

Form.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func
};

const Form = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label className={touched.name && errors.name && styles.labelError}>
          Name
          {touched.name && errors.name ? <span>{errors.name}</span> : null}
          <TextField
            type={touched.name && errors.name ? "danger" : "normal"}
            name="name"
            placeholder="What's the deck name?"
            className={styles.input}
            autoFocus
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
        </label>
      </div>
      <div className={styles.row}>
        <label
          className={
            touched.description && errors.description && styles.labelError
          }
        >
          Description
          {touched.description && errors.description ? (
            <span>{errors.description}</span>
          ) : null}
          <TextArea
            type={
              touched.description && errors.description ? "danger" : "normal"
            }
            name="description"
            placeholder="How do you describe this deck?"
            size="medium"
            rows={2}
            className={styles.input}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
          />
        </label>
      </div>
      <div className={styles.row}>
        <label className={touched.front && errors.front && styles.labelError}>
          Cards front type
          {touched.front && errors.front ? <span>{errors.front}</span> : null}
          <TextField
            type={touched.front && errors.front ? "danger" : "normal"}
            name="front"
            size="small"
            placeholder="What' the cards front type? Ex: English"
            className={styles.input}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.front}
          />
        </label>
      </div>
      <div className={styles.row}>
        <label className={touched.back && errors.back && styles.labelError}>
          Cards back type
          {touched.back && errors.back ? <span>{errors.back}</span> : null}
          <TextField
            type={touched.back && errors.back ? "danger" : "normal"}
            name="back"
            size="small"
            placeholder="What's the back type? Ex: Português"
            className={styles.input}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.back}
          />
        </label>
      </div>
      <div className={styles.buttons}>
        <Button highlighted type="primary" size="big" className={styles.button}>
          Create
        </Button>
        <Button size="big" className={styles.button}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

const FormikForm = withFormik({
  mapPropsToValues: () => {
    return {
      name: "",
      description: "",
      front: "",
      back: ""
    };
  },

  validate: values => {
    const errors = {};
    validation("name", [required(), maxLength(40)], errors)(values.name);
    validation("description", [maxLength(100)], errors)(values.description);
    validation("front", [maxLength(20)], errors)(values.front);
    validation("back", [maxLength(20)], errors)(values.back);
    return errors;
  },

  handleSubmit: () => {
    // TODO: create deck in the back-end, using values parameter
  }
})(Form);

export default CreateDeckPage;
