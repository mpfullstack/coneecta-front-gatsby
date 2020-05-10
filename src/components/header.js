import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import theme from '../theme';
import Logo from './logo';
import { Container, Row, Col } from 'react-bootstrap';

const HeaderWrapper = styled.header`
  width: 100%;
  background-color: ${theme.backgroundHeaderColor};
  .header-inner {
    height: 60px;
    margin: 0 auto;
    max-width: ${theme.SIZES.maxWidth};
    width: 100%;
    display: flex;
    align-items: center;
  }
`;

const Header = ({ siteTitle, handleHeaderClick }) => (
  <HeaderWrapper>
    <div className='header-inner'>
      <Container>
        <Row className='justify-content-center text-center'>
          <Col xs='12'>
            <h1 style={{ margin: 0 }}>
              <Link to='/' onClick={handleHeaderClick}>
                <Logo />
              </Link>
            </h1>
          </Col>
        </Row>
      </Container>
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