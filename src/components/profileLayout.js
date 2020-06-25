import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
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

const PaymentWrapper = styled.div`
`;

export const ProfileLayout = ({ profile, loadProfile, location, children }) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (!profile.details) {
      loadProfile();
    }
  }, [loadProfile, profile]);

  const userProfile = profile.details || null;

  return (
    <PaymentWrapper>
      <Container>
        <Row className='justify-content-md-center'>
          <Col xs='12' md='10'>
            {children}
          </Col>
        </Row>
      </Container>
    </PaymentWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLayout);