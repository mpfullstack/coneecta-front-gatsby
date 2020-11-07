import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';
import Header from './header';
import { hideApiError, hideAlert } from '../features/global/globalSlice';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../theme';
import { Alert } from 'react-bootstrap';
import Modal from './modal';
import '../locales/i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import './layout.scss';
import 'animate.css';

const LayoutWrapper = styled.div`
  .layout-inner {
    margin: 55px auto 0 auto;
    padding-top: 10px;
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
  hideApiError,
  hideAlert
};
const mapStateToProps = state => {
  return {
    global: state.global
  }
}

const Layout = ({ children, global, hideApiError, hideAlert }) => {
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
    // if (isDevice()) {
      document.body.style.backgroundColor = theme.backgroundColor({theme: {mode}});
    // } else {
    //   document.body.style.backgroundColor = '#fffff';
    // }
  });

  let alert;
  let apiErrorAlert;
  if (global.alert) {
    alert = <Modal>
      <Alert variant={global.alert.variant} onClose={hideAlert} dismissible>
        {t(global.alert.message)}
      </Alert>
    </Modal>
  }
  if (global.apiError) {
    apiErrorAlert = <Modal>
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
        {apiErrorAlert}
      </LayoutWrapper>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);