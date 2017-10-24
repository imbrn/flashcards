const typesWithPrefix = (prefix, actions) => {
  const prefixed = {};
  for (const key in actions) {
    prefixed[key] = `${prefix}_${actions[key]}`;
  }
  return prefixed;
};

export default typesWithPrefix;
