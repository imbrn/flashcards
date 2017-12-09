export const required = (message = "required") => {
  return value => (value ? null : message);
};

export const maxLength = (max, message = "max length is {max}") => {
  return value =>
    !value || value.length <= max ? null : message.replace(/\{(max)\}/, max);
};

export const minLength = (min, message = "min length is {min}") => {
  return value =>
    !value || value.length >= min ? null : message.replace(/\{(min)\}/, min);
};

const validation = (name, rules, errors) => {
  return value => {
    rules.forEach(rule => {
      const error = rule(value);
      if (error) {
        errors[name] = error.replace(/\{(value|val)\}/, value);
      }
    });
  };
};

export default validation;
