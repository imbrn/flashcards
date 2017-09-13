/**
 * Returns an object property value if it's defined, otherwise returns the
 * specified default value.
 * @param {*object} obj the object which has the expected property
 * @param {*string} name property name
 * @param {*object} defaultValue default value if property is not foud
 * @param {*fn} function applied to the value when it's valid.
 */
function objectValue(obj, name, defaultValue = null, fn = (obj) => obj) {
  return obj && obj.hasOwnProperty(name) ? fn(obj[name]) : defaultValue;
}

/**
 * Trims the specified value if it's valid, otherwise returns the original value.
 * @param {*string} value value to trim.
 */
function trim(value) {
  return value ? value.trim() : value;
}

export {
  objectValue,
  trim
};
