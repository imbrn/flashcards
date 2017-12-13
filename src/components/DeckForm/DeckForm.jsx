import React from "react";
import PropTypes from "prop-types";
import PropTypesUtils from "../prop-types-utils";
import classnames from "classnames";
import styles from "./DeckForm.css";
import { withFormik } from "formik";
import validation, { required, maxLength } from "../../validation";
import TextField from "../TextField";
import TextArea from "../TextArea";
import Button from "../Button";

const RawForm = ({
  className,
  confirmText = "Save",
  cancelText = "Cancel",
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  onCancel
}) => {
  return (
    <form
      className={classnames(styles.form, className)}
      onSubmit={handleSubmit}
    >
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
        <Button
          highlighted
          color="primary"
          size="medium"
          className={styles.button}
        >
          {confirmText}
        </Button>
        <Button
          type="button"
          size="medium"
          className={styles.button}
          onClick={onCancel}
        >
          {cancelText}
        </Button>
      </div>
    </form>
  );
};

RawForm.propTypes = {
  className: PropTypesUtils.className,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
};

const DeckForm = withFormik({
  mapPropsToValues: ({ defaultValue }) => {
    return {
      name: defaultValue ? defaultValue.name : "",
      description: defaultValue ? defaultValue.description : "",
      front: defaultValue ? defaultValue.front : "",
      back: defaultValue ? defaultValue.back : ""
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

  handleSubmit: (values, { props }) => {
    if (props.onSubmit) {
      props.onSubmit(values);
    }
  }
})(RawForm);

export default DeckForm;
