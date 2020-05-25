import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Router } from "@reach/router";
import { Provider } from 'react-redux';
import store, { persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import ProfessionalProfile from '../features/professionalProfile/professionalProfile';

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <SEO title='Professional' />
            <Router basepath="/u">
              <ProfessionalProfile path='/:slug' />
            </Router>
        </Layout>
      </PersistGate>
    </Provider>
  );
};