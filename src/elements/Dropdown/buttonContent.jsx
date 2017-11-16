import React from 'react';

function textAndIcon(text, icon='fa fa-angle-down') {
  return () => [
    <span key='text'>{text}</span>,
    <span key='icon' className='icon'>
      <i className={icon} />
    </span>
  ];
}

function text(value) {
  return () => <span>{value}</span>;
}

function icon(icon = 'fa fa-chevron-down') {
  return () => (
    <span className='icon'>
      <i className={icon} />        
    </span>
  );
}

export default {
  textAndIcon,
  text,
  icon,
};
