import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Header from './header';
import styled from 'styled-components';

import 'bootstrap/dist/css/bootstrap.min.css';
import './layout.scss';

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

  const LayoutWrapper = styled.div`
    .layout-inner {
      margin: 0 auto;
      max-width: 900px;
      width: 100%;
    }
  `;

  return (
    <LayoutWrapper className='layout'>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className='layout-inner'>
        <main>{children}</main>
        <footer>
          Footer
        </footer>
      </div>
    </LayoutWrapper>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
