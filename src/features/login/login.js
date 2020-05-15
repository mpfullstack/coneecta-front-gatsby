import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadProfile } from '../professionalProfile/professionalProfileSlice';
import Query from '../../helpers/query';
import ProfileHeader from '../../components/professionalProfile/profileHeader';
import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from './loginForm';

const mapDispatchToProps = { loadProfile };
const mapStateToProps = state => {
  return {
    profile: state.professionalProfile,
    global: state.global,
    booking: state.booking
  }
}

export const ProfessionalProfile = ({ profile, loadProfile, location, booking }) => {
  useEffect(() => {
    if (!profile.id) {
      const params = Query.getParams(location);
      if (params.id) {
        loadProfile(params.id);
      }
    }
  }, [loadProfile, location, profile.id]);

  const profileDetails = profile.details || {};

  return (
    <Container>
      {profile.id ?
        <ProfileHeader id={profile.id} {...profileDetails} collapse={true} />
        : null}
      <Row className='justify-content-md-center'>
        <Col xs='12' md='10'>
          <p>Login</p>
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalProfile);