const separator = () => {
  return {
    type: "separator",
  }
};

const item = ({ tag, icon, text, color="normal", ...params }) => {
  return {
    tag,
    icon,
    text,
    color,
    ...params,
  };
};

export default {
  separator,
  item,
};
