import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Location } from '@reach/router';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Login from '../features/login';

export default () => {
  return (
    <Provider store={store}>
      <Layout>
        <SEO title='Login' />
        <Location>
          {props => <Login {...props} />}
        </Location>
      </Layout>
    </Provider>
  );
};