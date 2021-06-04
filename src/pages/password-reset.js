import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Location } from '@reach/router';
import { Provider } from 'react-redux';
import store, { persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import PasswordReset from '../features/loginSignUp/passwordReset';

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <SEO title='Password reset' />
          <Location>
            {props => <PasswordReset {...props} />}
          </Location>
        </Layout>
      </PersistGate>
    </Provider>
  );
};