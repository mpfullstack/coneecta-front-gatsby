import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { loadProfessionalProfile } from '../features/professionalProfile/professionalProfileSlice';
import ProfileHeader from './professionalProfile/profileHeader';
import { Container, Row, Col } from 'react-bootstrap';
import Booking from '../features/booking/booking';
import Query from '../helpers/query';

const mapDispatchToProps = { loadProfessionalProfile };
const mapStateToProps = state => {
  return {
    profile: state.professionalProfile,
    global: state.global,
    booking: state.booking
  }
}

const RegisterWrapper = styled.div`
  .register-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0 12px 0;
    a {
      font-size: 20px;
      display: inline-block;
      &:first-child:after {
        content: '|';
        position: relative;
        left: 10px;
      }
      &:last-child {
        margin-left: 20px;
      }
      &.selected {
        font-weight: bold;
      }
    }
  }
`;

export const RegisterLayout = ({ profile, loadProfessionalProfile, location, children }) => {
  // TODO: Check if it work on build production as location is not ready
  const slug = Query.getParams(location).slug;
  const { t } = useTranslation();

  useEffect(() => {
    if (slug !== '') {
      if (!profile.id) {
        loadProfessionalProfile({id: slug});
      }
    }
  }, [loadProfessionalProfile, location, profile.id, slug]);

  const profileDetails = profile.details || {};

  function getClassName(section) {
    if (location.pathname.indexOf(section) !== -1) {
      return { className: 'selected' };
    } else {
      return {};
    }
  }

  return (
    <RegisterWrapper>
      <Container>
        {profile.id ?
          <ProfileHeader id={profile.id} slug={slug} {...profileDetails} collapse={true} />
          : null}
        <Row className='justify-content-md-center'>
          <Col xs='12' md='10'>
            <Booking slug={slug} />
            <nav className='register-nav'>
              <Link {...getClassName('login')} to={`/login?slug=${slug}`}>{t('login')}</Link>
              <Link {...getClassName('signup')} to={`/signup?slug=${slug}`}>{t('signup')}</Link>
            </nav>
            {children}
          </Col>
        </Row>
      </Container>
    </RegisterWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterLayout);