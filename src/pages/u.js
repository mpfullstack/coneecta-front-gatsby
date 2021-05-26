import React, { useEffect } from 'react';
import Layout from '../components/layout';
import { Router } from "@reach/router";
import { navigate } from 'gatsby';
import { Provider } from 'react-redux';
import store, { persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import ProfessionalProfile from '../features/professionalProfile/professionalProfile';
import ProfessionalReviews from '../features/professionalProfile/professionalReviews';

const CustomRedirect = () => {
  useEffect(() => navigate('/profile/'), []);
  return null;
}

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Router basepath={`${process.env.PATH_PREFIX}/u`}>
            <ProfessionalProfile path='/:slug' />
            <ProfessionalReviews path='/:slug/reviews' />
            <ProfessionalProfile path='/:slug/:serviceSlug' />
            <CustomRedirect default />
          </Router>
        </Layout>
      </PersistGate>
    </Provider>
  );
};