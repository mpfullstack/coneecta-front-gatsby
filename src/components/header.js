import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import theme from '../theme';
import Logo from './logo';
import { Container, Row, Col } from 'react-bootstrap';
import UserProfileIcon from './userProfileIcon';

const HeaderWrapper = styled.header`
  width: 100%;
  background-color: '#fff';
  height: 55px;
  @media only screen and (max-width: ${theme.SIZES.M}) {
  height: 48px;
    background-color: ${theme.backgroundHeaderColor};
  }
  .header-inner {
    margin: 0 auto;
    max-width: ${theme.SIZES.maxWidth};
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .title-logo {
      margin-top: 5px;
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
              <a target='_blank' href='https://coneecta.com/' rel='noreferrer noopener'>
                <Logo />
              </a>
            </h1>
          </Col>
        </Row>
      </Container>
    </div>
    {/* {isLoggedIn() ? <UserProfileIcon /> : null} */}
    <UserProfileIcon />
  </HeaderWrapper>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header;