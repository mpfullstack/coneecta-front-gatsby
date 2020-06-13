import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import { connect } from 'react-redux';
import { loadProfile } from '../features/professionalProfile/professionalProfileSlice';
import ProfileHeader from './professionalProfile/profileHeader';
import { Container, Row, Col } from 'react-bootstrap';
import Booking from '../features/booking/booking';
import Query from '../helpers/query';

const mapDispatchToProps = { loadProfile };
const mapStateToProps = state => {
  return {
    profile: state.professionalProfile,
    global: state.global,
    booking: state.booking
  }
}

export const RegisterLayout = ({ profile, loadProfile, location, children }) => {
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
          <nav>
            <Link to={`/login?slug=${slug}`}>Login</Link>
            <Link to={`/signup?slug=${slug}`}>Sign Up</Link>
          </nav>
          {children}
        </Col>
      </Row>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterLayout);