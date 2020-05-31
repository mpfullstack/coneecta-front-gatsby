import React from 'react';
import Layout from '../components/layout';
import { Router } from "@reach/router";
import { Provider } from 'react-redux';
import store, { persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import ProfessionalProfile from '../features/professionalProfile/professionalProfile';
import ProfessionalReviews from '../features/professionalProfile/professionalReviews';

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Router basepath="/u">
            <ProfessionalProfile path='/:slug' />
            <ProfessionalReviews path='/:slug/reviews' />
            <ProfessionalProfile path='/:slug/:serviceSlug' />
          </Router>
        </Layout>
      </PersistGate>
    </Provider>
  );
};