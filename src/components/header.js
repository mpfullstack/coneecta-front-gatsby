import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  width: 100%;
  background-color: #00afedd6;
  .header-inner {
    margin: 0 auto;
    max-width: 900px;
    width: 100%;
  }
`;

const Header = ({ siteTitle }) => (
  <HeaderWrapper>
    <div className='header-inner'>
      <h1 style={{ margin: 0 }}>
        <Link to='/'>
          {siteTitle}
        </Link>
      </h1>
    </div>
  </HeaderWrapper>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header;