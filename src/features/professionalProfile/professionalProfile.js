import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadProfessionalProfile, collapseProfileHeader } from './professionalProfileSlice';
import { loadProfile } from '../profile/profileSlice';
import SEO from '../../components/seo';
import { Container, Row, Col } from 'react-bootstrap';
import ProfileHeader from '../../components/professionalProfile/profileHeader';
import ProfessionalProfileSection from './professionalProfileSection';
import { getTimeLimits } from '../booking/bookingSlice';

const mapDispatchToProps = { loadProfessionalProfile, collapseProfileHeader, loadProfile, getTimeLimits };
const mapStateToProps = state => {
  return {
    profile: state.professionalProfile,
    global: state.global,
    booking: state.booking
  }
}

export const ProfessionalProfile = ({
  profile, loadProfessionalProfile, collapseProfileHeader, location,
  slug, serviceSlug, loadProfile, getTimeLimits
}) => {
  useEffect(() => {
    loadProfile();
    getTimeLimits();
    if (slug !== '') {
      loadProfessionalProfile({id: slug, sid: serviceSlug});
    } else {
      // TODO: Handle if no professional id is present in URL
    }
  }, [loadProfessionalProfile, location, slug, serviceSlug, loadProfile, getTimeLimits]);

  const profileDetails = profile.details || {};

  return (
    <Container>
      <SEO title='Professional' />
      <ProfileHeader id={profile.id} slug={slug} serviceSlug={serviceSlug} {...profileDetails}
        collapse={profile.collapseProfileHeader} collapseProfileHeader={collapseProfileHeader} />
      <Row className='justify-content-md-center'>
        <Col xs='12' md='10'>
          <ProfessionalProfileSection slug={slug} />
        </Col>
      </Row>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalProfile);