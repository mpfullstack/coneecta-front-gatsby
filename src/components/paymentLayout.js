import React, { useEffect } from 'react';
import styled from 'styled-components';
// import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { loadProfessionalProfile } from '../features/professionalProfile/professionalProfileSlice';
import ProfileHeader from './professionalProfile/profileHeader';
import { Container, Row, Col } from 'react-bootstrap';
import Booking from '../features/booking/booking';
import Query from '../helpers/query';

const mapDispatchToProps = { loadProfessionalProfile };
const mapStateToProps = ({ professionalProfile, booking, global }) => {
  return {
    professionalProfile,
    global,
    booking
  }
}

const PaymentWrapper = styled.div`
`;

export const PaymentLayout = ({ professionalProfile, loadProfessionalProfile, location, children }) => {
  // TODO: Check if it work on build production as location is not ready
  const slug = Query.getParams(location).slug;
  // const { t } = useTranslation();

  useEffect(() => {
    if (slug !== '') {
      if (!professionalProfile.id) {
        loadProfessionalProfile({id: slug});
      }
    }
  }, [loadProfessionalProfile, location, professionalProfile.id, slug]);

  const profileDetails = professionalProfile.details || {};

  return (
    <PaymentWrapper>
      <Container>
        {professionalProfile.id ?
          <ProfileHeader id={professionalProfile.id} slug={slug} {...profileDetails} collapse={true} />
          : null}
        <Row className='justify-content-md-center'>
          <Col xs='12' md='10'>
            <Booking slug={slug} />
            {children}
          </Col>
        </Row>
      </Container>
    </PaymentWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentLayout);