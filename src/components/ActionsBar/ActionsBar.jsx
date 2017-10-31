import React from 'react';

const ActionsBar = ({ children }) => {

  const className =
    'is-clearfix has-border has-border-bottom ' +
    'has-border-grey-lighter gutters margin-bottom';

  return (
    <div className={className}>
      {children}
    </div>
  );

};

export default ActionsBar;
