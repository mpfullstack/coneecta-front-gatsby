import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { Location } from '@reach/router';
import Profile from '../features/profile';

export default () => {
  return (
    <Provider store={store()}>
      <h1>Redux Gatsby</h1>
      <Location>
        {props => <Profile {...props} />}
      </Location>
    </Provider>
  );
};