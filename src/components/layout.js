import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Header from './header';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../theme';
import { Alert } from 'react-bootstrap';
import Modal from './modal';
import '../locales/i18n';

import 'bootstrap/dist/css/bootstrap.min.css';
import './layout.scss';
// Animate CSS
import 'animate.css';

const LayoutWrapper = styled.div`
  .layout-inner {
    margin: 0 auto;
    max-width: ${theme.SIZES.maxWidth};
    width: 100%;
  }
`;

const mapStateToProps = state => {
  return {
    global: state.global
  }
}

const Layout = ({ children, global }) => {
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
  const [mode, setThemeMode] = useState('light');

  // useEffect hook to set theme mode background-color style to body element
  useEffect(() => {
    document.body.style.backgroundColor = theme.backgroundColor({theme: {mode}});
  });

  let alert;
  if (global.apiError) {
    alert = <Modal>
      <Alert variant={'danger'}>
        {global.apiError.name}
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
            Footer
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

export default connect(mapStateToProps)(Layout);