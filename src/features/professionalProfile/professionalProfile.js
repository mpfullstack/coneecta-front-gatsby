import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadProfile, collapseProfileHeader } from './professionalProfileSlice';
import Query from '../../helpers/query';
import { Container, Row, Col } from 'react-bootstrap';
import ProfileHeader from '../../components/professionalProfile/profileHeader';
import ProfessionalProfileSection from './professionalProfileSection';

// https://github.com/buildo/react-placeholder
// https://github.com/dvtng/react-loading-skeleton


// Stars rating component
// https://www.npmjs.com/package/react-star-rating-component

const mapDispatchToProps = { loadProfile, collapseProfileHeader };
const mapStateToProps = state => {
  return {
    profile: state.professionalProfile,
    global: state.global,
    booking: state.booking
  }
}

export const ProfessionalProfile = ({ profile, loadProfile, collapseProfileHeader, location, slug }) => {
  useEffect(() => {
    const params = Query.getParams(location);
    if (slug !== '') {
      loadProfile({id: slug, sid: params.sid}); // TODO: Get sid from path instead of querystring
    } else {
      // TODO: Handle if no professional id is present in URL
    }
  }, [loadProfile, location, slug]);

  const profileDetails = profile.details || {};

  return (
    <Container>
      <ProfileHeader id={profile.id} {...profileDetails}
        collapse={profile.collapseProfileHeader} collapseProfileHeader={collapseProfileHeader} />
      <Row className='justify-content-md-center'>
        <Col xs='12' md='10'>
          <ProfessionalProfileSection />
        </Col>
      </Row>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalProfile);