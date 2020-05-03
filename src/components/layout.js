import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Header from './header';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../theme';
import '../locales/i18n';

import 'bootstrap/dist/css/bootstrap.min.css';
import './layout.scss';

const LayoutWrapper = styled.div`
  .layout-inner {
    margin: 0 auto;
    max-width: ${theme.SIZES.maxWidth};
    width: 100%;
  }
`;

const Layout = ({ children }) => {
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
      </LayoutWrapper>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
