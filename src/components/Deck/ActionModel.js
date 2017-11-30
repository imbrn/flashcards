import Button from "../Button";

const ActionModel = ({ tag = Button, label, ...params }) => {
  return {
    tag,
    label,
    params,
  };
};

export default ActionModel;
