import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Location } from '@reach/router';
import { Provider } from 'react-redux';
import { useTranslation } from 'react-i18next';
import store from '../redux/store';
import ProfessionalReviews from '../features/professionalProfile/professionalReviews';

export default () => {
  const { t } = useTranslation();
  return (
    <Provider store={store}>
      <Layout>
        <SEO title={t('Professional reviews')} />
        <Location>
          {props => <ProfessionalReviews {...props} />}
        </Location>
      </Layout>
    </Provider>
  );
};