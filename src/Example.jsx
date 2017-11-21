import React from 'react';

class Example extends React.Component {

  render() {
    return <Message message='Hello React!' style={{background:'yellow'}} />
  }

}

const Message = ({ message, ...rest }) => {
  return (
    <div {...rest}>
      {message}
    </div>
  );
};

export default Example;
