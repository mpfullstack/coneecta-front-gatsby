import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadProfile, collapseProfileHeader } from './professionalProfileSlice';
import SEO from '../../components/seo';
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

export const ProfessionalProfile = ({ profile, loadProfile, collapseProfileHeader, location, slug, serviceSlug }) => {
  useEffect(() => {
    if (slug !== '') {
      loadProfile({id: slug, sid: serviceSlug});
    } else {
      // TODO: Handle if no professional id is present in URL
    }
  }, [loadProfile, location, slug, serviceSlug]);

  const profileDetails = profile.details || {};

  return (
    <Container>
      <SEO title='Professional' />
      <ProfileHeader id={profile.id} slug={slug} serviceSlug={serviceSlug} {...profileDetails}
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