import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Location } from '@reach/router';
import { Provider } from 'react-redux';
import store from '../redux/store';
import ProfessionalProfile from '../features/professionalProfile';

const Professional = () => (
  <Layout>
    <SEO title='Professional' />
    <Provider store={store()}>
      <Location>
        {props => <ProfessionalProfile {...props} />}
      </Location>
    </Provider>
  </Layout>
)

export default Professional;