import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadProfile } from '../professionalProfile/professionalProfileSlice';
import ProfileHeader from '../../components/professionalProfile/profileHeader';
import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from './loginForm';
import Booking from '../booking';
import Query from '../../helpers/query';

const mapDispatchToProps = { loadProfile };
const mapStateToProps = state => {
  return {
    profile: state.professionalProfile,
    global: state.global,
    booking: state.booking
  }
}

export const ProfessionalProfile = ({ profile, loadProfile, location }) => {
  // TODO: Check if it work on build production as location is not ready
  const slug = Query.getParams(location).slug;

  useEffect(() => {
    if (slug !== '') {
      if (!profile.id) {
        loadProfile({id: slug});
      }
    }
  }, [loadProfile, location, profile.id, slug]);

  const profileDetails = profile.details || {};

  return (
    <Container>
      {profile.id ?
        <ProfileHeader id={profile.id} slug={slug} {...profileDetails} collapse={true} />
        : null}
      <Row className='justify-content-md-center'>
        <Col xs='12' md='10'>
          <Booking slug={slug} />
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalProfile);