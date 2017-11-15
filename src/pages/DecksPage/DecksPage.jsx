import React from 'react';
import { Button } from '../../elements';

const DecksPage = () => {
  return (
    <div>
      <div>
        <Button>Button one</Button>
        <Button type='primary'>Primary</Button>
        <Button type='link'>Link</Button>
        <Button type='info'>Info</Button>
        <Button type='success'>Success</Button>
        <Button type='warning'>Warning</Button>
        <Button type='danger'>danger</Button>
      </div>
      <div>
        <Button strong>Button one</Button>
        <Button strong type='primary'>Primary</Button>
        <Button strong type='link'>Link</Button>
        <Button strong type='info'>Info</Button>
        <Button strong type='success'>Success</Button>
        <Button strong type='warning'>Warning</Button>
        <Button strong type='danger'>danger</Button>
      </div>
    </div>
  );
}

export default DecksPage;
