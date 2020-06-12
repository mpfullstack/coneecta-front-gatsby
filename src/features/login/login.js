import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadProfile } from '../professionalProfile/professionalProfileSlice';
import ProfileHeader from '../../components/professionalProfile/profileHeader';
import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from './loginForm';
import Booking from '../booking';

const mapDispatchToProps = { loadProfile };
const mapStateToProps = state => {
  return {
    profile: state.professionalProfile,
    global: state.global,
    booking: state.booking
  }
}

export const ProfessionalProfile = ({ profile, loadProfile, location, slug }) => {
  useEffect(() => {
    if (!profile.id) {
      if (slug !== '') {
        loadProfile({id: slug});
      }
    }
  }, [loadProfile, location, profile.id, slug]);

  const profileDetails = profile.details || {};

  return (
    <Container>
      {profile.id ?
        <ProfileHeader id={profile.id} {...profileDetails} collapse={true} />
        : null}
      <Row className='justify-content-md-center'>
        <Col xs='12' md='10'>
          <Booking />
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalProfile);