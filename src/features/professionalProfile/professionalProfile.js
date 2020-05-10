import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadProfile } from './professionalProfileSlice';
import Query from '../../helpers/query';
import { Container, Row, Col } from 'react-bootstrap';
import ProfileHeader from '../../components/professionalProfile/profileHeader';
import ProfessionalProfileSection from './professionalProfileSection';

// https://github.com/buildo/react-placeholder
// https://github.com/dvtng/react-loading-skeleton


// Stars rating component
// https://www.npmjs.com/package/react-star-rating-component

const mapDispatchToProps = { loadProfile };
const mapStateToProps = state => {
  return {
    profile: state.professionalProfile,
    global: state.global
  }
}

export const ProfessionalProfile = ({ profile, loadProfile, location }) => {
  useEffect(() => {
    const params = Query.getParams(location);
    if (params.id) {
      loadProfile(params.id);
    }
  }, [loadProfile, location]);

  const profileDetails = profile.details || {};

  return (
    <Container>
      <ProfileHeader {...profileDetails} collapse={profile.collapseProfileHeader} />
      <Row className='justify-content-md-center'>
        <Col xs='12' md='10'>
          <ProfessionalProfileSection />
        </Col>
      </Row>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalProfile);