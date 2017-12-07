import PropTypes from "prop-types";

const propTypeUtils = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
};

export default propTypeUtils;
