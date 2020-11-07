import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import theme from '../theme';
import Logo from './logo';
import { Container, Row, Col } from 'react-bootstrap';
import UserProfileMenu from './userProfileMenu';

const HeaderWrapper = styled.header`
  width: 100%;
  background-color: ${theme.backgroundHeaderColor};

  box-shadow: rgba(51,51,51,0.15) 0px 4px 6px 0;
  position: fixed;
  top: 0;
  z-index: 1000;
  .header-inner {
    height: 55px;
    margin: 0 auto;
    max-width: ${theme.SIZES.maxWidth};
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const Header = ({ siteTitle }) => (
  <HeaderWrapper>
    <div className='header-inner'>
      <Container>
        <Row className='justify-content-center text-center'>
          <Col xs='12' className='title-logo'>
            <h1 style={{ margin: 0 }}>
              <Link to='/profile'>
                <Logo />
              </Link>
            </h1>
          </Col>
        </Row>
      </Container>
    </div>
    <UserProfileMenu />
  </HeaderWrapper>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header;