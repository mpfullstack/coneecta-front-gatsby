import React, { useEffect } from 'react';
import styled from 'styled-components';
import { isLoggedIn } from '../helpers/authentication';
import { Link, navigate } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { loadProfessionalProfile } from '../features/professionalProfile/professionalProfileSlice';
import ProfileHeader from './professionalProfile/profileHeader';
import { Container, Row, Col } from 'react-bootstrap';
import Booking from '../features/booking/booking';
import Query from '../helpers/query';

const mapDispatchToProps = { loadProfessionalProfile };
const mapStateToProps = ({ professionalProfile, booking, global }) => {
  return {
    professionalProfile,
    global,
    booking
  }
}

const RegisterWrapper = styled.div`
  .register-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0 12px 0;
    a {
      font-size: 18px;
      display: inline-block;
      text-transform: uppercase;
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
  .text {
    padding: 0 20px;
  }
  .form-check,
  .privacy-policy {
    padding: 0 40px;
  }
`;

export const RegisterLayout = ({ professionalProfile, loadProfessionalProfile, location, children }) => {
  // TODO: Check if it work on build production as location is not ready
  const slug = Query.getParams(location).slug;
  const { t } = useTranslation();

  useEffect(() => {
    // If user is logged in, navigate to /profile/payment
    if (isLoggedIn()) {
      navigate(`/profile/payment?slug=${slug}`);
    } else if (slug !== '' && slug !== 'undefined' && slug != null) {
      if (!professionalProfile.id) {
        loadProfessionalProfile({id: slug});
      }
    }
  }, [loadProfessionalProfile, location, professionalProfile.id, slug]);

  const profileDetails = professionalProfile.details || {};

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
        {professionalProfile.id ?
          <ProfileHeader id={professionalProfile.id} slug={slug} {...profileDetails} collapse={true} />
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