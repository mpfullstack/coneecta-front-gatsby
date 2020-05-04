import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadProfile } from './professionalProfileSlice';
import Query from '../../helpers/query';
import Skeleton from 'react-loading-skeleton';
import ImageSkeleton from '../../components/imageSkeleton';
import { Container, Row, Col } from 'react-bootstrap';
import ProfessionalServices from './professionalServices';
import { useTranslation } from 'react-i18next';

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
      <Row className="justify-content-md-center text-center">
        <Col xs="12" md="10">
          <ImageSkeleton url={profileDetails.profilePic} circle={true} width={124} height={124} />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs="12" md="10">
          <p>{t('name')}: {profileDetails.name || <Skeleton width={200} />}</p>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs="12" md="10">
          {
            profileServices ?
              <>
                <p>{t('Do you want to contact me?')}</p>
                <p>{t('These are my services')}</p>
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