import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadProfile, collapseProfileHeader } from './professionalProfileSlice';
import Query from '../../helpers/query';
import Skeleton from 'react-loading-skeleton';
import { Container, Row, Col } from 'react-bootstrap';
import ProfessionalServices from './professionalServices';
import { useTranslation } from 'react-i18next';
import ProfileHeader from '../../components/professionalProfile/profileHeader';

// https://github.com/buildo/react-placeholder
// https://github.com/dvtng/react-loading-skeleton


// Stars rating component
// https://www.npmjs.com/package/react-star-rating-component

const mapDispatchToProps = { loadProfile, collapseProfileHeader };
const mapStateToProps = state => {
  return {
    profile: state.professionalProfile,
    global: state.global
  }
}

export const ProfessionalProfile = ({ profile, loadProfile, collapseProfileHeader, location }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const params = Query.getParams(location);
    if (params.id) {
      loadProfile(params.id);
    }
  }, [loadProfile, location]);

  const profileDetails = profile.details || {};
  const profileServices = profile.services && profile.services.length ? profile.services : null;

  return (
    <Container>
      <ProfileHeader {...profileDetails} collapse={profile.collapseProfileHeader} />
      <Row className='justify-content-md-center'>
        <Col xs='12' md='10'>
          {// TODO: If only one service, show detail
            profileServices ?
              <ProfessionalServices services={profileServices} onClick={collapseProfileHeader} />
              :
              <Skeleton height={24} count={4} />
          }
        </Col>
      </Row>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalProfile);