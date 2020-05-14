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
    margin: 0 auto;
    max-width: ${theme.SIZES.maxWidth};
    width: 100%;
    display: flex;
    align-items: center;
  }
`;

const Header = ({ siteTitle }) => (
  <HeaderWrapper>
    <div className='header-inner'>
      <Container>
        <Row className='justify-content-center text-center'>
          <Col xs='12'>
            <h1 style={{ margin: 0 }}>
              <a target='_blank' href='https://coneecta.com/'>
                <Logo />
              </a>
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