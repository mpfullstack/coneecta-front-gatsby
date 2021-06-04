import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadProfessionalProfile, collapseProfileHeader } from './professionalProfileSlice';
import { loadProfile } from '../profile/profileSlice';
import SEO from '../../components/seo';
import { Container, Row, Col } from 'react-bootstrap';
import ProfileHeader from '../../components/professionalProfile/profileHeader';
import ProfessionalProfileSection from './professionalProfileSection';
import { getTimeLimits } from '../booking/bookingSlice';
import useContentLoaded from '../../components/hooks/useContentLoaded';
import { navigate } from 'gatsby';

const mapDispatchToProps = { loadProfessionalProfile, collapseProfileHeader, loadProfile, getTimeLimits };
const mapStateToProps = state => {
  return {
    profile: state.professionalProfile,
    global: state.global,
    booking: state.booking,
    loading: state.professionalProfile.loading
  }
}

export const ProfessionalProfile = ({
  profile, loadProfessionalProfile, collapseProfileHeader, location,
  slug, serviceSlug, loadProfile, getTimeLimits, loading
}) => {
  useEffect(() => {
    loadProfile({ redirect: false });
    getTimeLimits();
    if (slug !== '' && slug !== 'undefined' && slug != null) {
      loadProfessionalProfile({id: slug, sid: serviceSlug});
    } else {
      // Handle if no professional id is present in URL
      navigate('/profile/');
    }
  }, [loadProfessionalProfile, location, slug, serviceSlug, loadProfile, getTimeLimits]);

  const loaded = useContentLoaded(loading);

  const profileDetails = loaded && profile.details ? profile.details : {};

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