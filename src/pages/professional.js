import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Location } from '@reach/router';
import { Provider } from 'react-redux';
import store from '../redux/store';
import ProfessionalProfile from '../features/professionalProfile';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation();

  return (
    <Provider store={store}>
      <Layout>
        <SEO title='Professional' />
        <p>{t('Welcome to Coneecta')}</p>
        <Location>
          {props => <ProfessionalProfile {...props} />}
        </Location>
      </Layout>
    </Provider>
  );
};