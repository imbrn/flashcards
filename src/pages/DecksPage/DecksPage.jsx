import React from 'react';
import Dropdown, {
  SimpleItem, Separator, ImageAndTextItem, ContentItem
} from '../../elements/Dropdown';
import { Link } from 'react-router-dom';

const DecksPage = () => {
  return (
    <div>
      <div>
        <Dropdown button='Dropdown' type='primary'>
          <ImageAndTextItem text='Edit' icon='fa fa-pencil' />
          <SimpleItem onClick={() => console.log('hello world')}>Hello</SimpleItem>
          <SimpleItem>World</SimpleItem>
          <Separator />
          <ContentItem>
            <div><strong>Hello</strong></div>
            <div>
              <p>This is a content item</p>
            </div>
            <Link to='/deck/1'>
              Go to another page
            </Link>
          </ContentItem>
          <SimpleItem>Hi</SimpleItem>
        </Dropdown>
      </div>
    </div>
  );
}

export default DecksPage;
