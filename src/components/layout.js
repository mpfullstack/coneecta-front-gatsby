import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';
import Header from './header';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../theme';
import { Alert } from 'react-bootstrap';
import Modal from './modal';
import '../locales/i18n';
import { isDevice } from '../helpers/helpers';

import 'bootstrap/dist/css/bootstrap.min.css';
import './layout.scss';
// Animate CSS
import 'animate.css';
import { hideApiError } from '../features/global/globalSlice';

const LayoutWrapper = styled.div`
  .layout-inner {
    margin: 65px auto 0 auto;
    max-width: ${theme.SIZES.maxWidth};
    width: 100%;
    background-color: ${theme.backgroundColor};
    @media only screen and (min-width: ${theme.SIZES.M}) {
      min-height: 94vh;
    }
  }

  a {
    color: ${theme.textColor}
  }
`;

const mapDispatchToProps = {
  hideApiError
};
const mapStateToProps = state => {
  return {
    global: state.global
  }
}

const Layout = ({ children, global, hideApiError }) => {
  const { t } = useTranslation();

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  // useState hook to set theme mode
  const [mode/*, setThemeMode*/] = useState('light');

  // useEffect hook to set theme mode background-color style to body element
  useEffect(() => {
    if (isDevice()) {
      document.body.style.backgroundColor = theme.backgroundColor({theme: {mode}});
    } else {
      document.body.style.backgroundColor = '#fffff';
    }
  });

  let alert;
  if (global.apiError) {
    alert = <Modal>
      <Alert variant={'danger'} onClose={hideApiError} dismissible>
        {t(global.apiError)}
      </Alert>
    </Modal>
  }

  return (
    <ThemeProvider theme={{ mode: mode }}>
      <LayoutWrapper className='layout'>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div className='layout-inner'>
          <main>{children}</main>
          <footer>
          </footer>
        </div>
        {alert}
      </LayoutWrapper>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);