import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Location } from '@reach/router';
import { Provider } from 'react-redux';
import store, { persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import ProfessionalProfile from '../features/professionalProfile';

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <SEO title='Professional' />
          <Location>
            {props => <ProfessionalProfile {...props} />}
          </Location>
        </Layout>
      </PersistGate>
    </Provider>
  );
};