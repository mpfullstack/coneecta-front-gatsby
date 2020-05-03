import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadProfile } from './professionalProfileSlice';
import Query from '../../helpers/query';
import Skeleton from 'react-loading-skeleton';
import ImageSkeleton from '../../components/imageSkeleton';
import { Container, Row, Col } from 'react-bootstrap';
import ProfessionalServices from './professionalServices';

// https://github.com/buildo/react-placeholder
// https://github.com/dvtng/react-loading-skeleton

const mapDispatchToProps = { loadProfile };
const mapStateToProps = state => {
  return {
    profile: state.professionalProfile
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
  const profileServices = profile.services && profile.services.length ? profile.services : null;

  return (
    <Container>
        <Row className="justify-content-md-center text-center">
          <Col xs="12" md="10">
            <ImageSkeleton url={profileDetails.profilePic} circle={true} width={124} height={124} />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs="12" md="10">
            <p>Name: {profileDetails.name || <Skeleton width={200} />}</p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs="12" md="10">
            {
              profileServices ?
                <>
                  <p>¿Quieres contactar conmigo?</p>
                  <p>Estos son mis servicios</p>
                  <ProfessionalServices services={profileServices} />
                </>
                :
                <Skeleton height={24} count={4} />
            }
          </Col>
        </Row>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalProfile);