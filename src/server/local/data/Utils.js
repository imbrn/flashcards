/**
 * Returns an object property value if it's defined, otherwise returns the
 * specified default value.
 * @param {*object} obj the object which has the expected property
 * @param {*string} name property name
 * @param {*object} defaultValue default value if property is not foud
 */
function objectValue(obj, name, defaultValue = null, fn = (obj) => obj) {
  return obj && obj.hasOwnProperty(name) ? fn(obj[name]) : defaultValue;
}

export {
  objectValue
};
