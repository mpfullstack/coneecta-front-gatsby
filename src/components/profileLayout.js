import React, { useEffect } from 'react';
import styled from 'styled-components';
// import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { loadProfile } from '../features/profile/profileSlice';
import { Container, Row, Col } from 'react-bootstrap';

const mapDispatchToProps = { loadProfile };
const mapStateToProps = ({ profile, global }) => {
  return {
    profile,
    global
  }
}

const ProfileLayoutWrapper = styled.div`
  .title {
    font-weight: 800;
    margin-top: 20px;
    font-size: 20px;
    text-transform: uppercase;
    text-align: center;
  }
`;

export const ProfileLayout = ({ profile, loadProfile, children }) => {

  useEffect(() => {
    if (!profile.details) {
      loadProfile();
    }
  }, [loadProfile, profile]);

  return (
    <ProfileLayoutWrapper>
      <Container>
        <Row className='justify-content-md-center'>
          <Col xs='12' md='10'>
            {children}
          </Col>
        </Row>
      </Container>
    </ProfileLayoutWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLayout);