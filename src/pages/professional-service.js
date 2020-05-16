import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Location } from '@reach/router';
import { Provider } from 'react-redux';
import store from '../redux/store';
import ProfessionalProfile from '../features/professionalProfile';

export default () => {
  return (
    <Provider store={store}>
      <Layout>
        <SEO title='Professional service' />
        <Location>
          {props => <ProfessionalProfile {...props} />}
        </Location>
      </Layout>
    </Provider>
  );
};