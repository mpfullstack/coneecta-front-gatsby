import React, { useEffect } from 'react';
import styled from 'styled-components';
// import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { loadProfessionalProfile } from '../features/professionalProfile/professionalProfileSlice';
import { loadProfile } from '../features/profile/profileSlice';
import { getTimeLimits } from '../features/booking/bookingSlice';
import ProfileHeader from './professionalProfile/profileHeader';
import { Container, Row, Col } from 'react-bootstrap';
import Booking from '../features/booking/booking';
import Query from '../helpers/query';

const mapDispatchToProps = { loadProfessionalProfile, loadProfile, getTimeLimits };
const mapStateToProps = ({ professionalProfile, booking, global, profile }) => {
  return {
    professionalProfile,
    global,
    booking,
    profile
  }
}

const PaymentWrapper = styled.div`
  padding-bottom: 60px;
`;

export const PaymentLayout = ({
  professionalProfile, loadProfessionalProfile, profile,
  location, loadProfile, getTimeLimits,
  showProfesionalProfile = true, showBooking = true, children
}) => {
  // TODO: Check if it work on build production as location is not ready
  const slug = Query.getParams(location).slug;
  // const { t } = useTranslation();

  useEffect(() => {
    if (slug !== '' && slug !== 'undefined' && slug != null) {
      if (!professionalProfile.id) {
        loadProfessionalProfile({id: slug});
      }
    }
  }, [loadProfessionalProfile, location, professionalProfile.id, slug]);

  useEffect(() => {
    if (!profile.details) {
      loadProfile();
    }
    getTimeLimits();
  }, [loadProfile, profile.details, getTimeLimits]);

  const profileDetails = professionalProfile.details || {};

  return (
    <PaymentWrapper>
      <Container>
        {showProfesionalProfile && professionalProfile.id ?
          <ProfileHeader id={professionalProfile.id} slug={slug} {...profileDetails} collapse={true} />
          : null}
        <Row className='justify-content-md-center'>
          <Col xs='12' md='10'>
            {showBooking ? <Booking slug={slug} /> : null}
            {children}
          </Col>
        </Row>
      </Container>
    </PaymentWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentLayout);