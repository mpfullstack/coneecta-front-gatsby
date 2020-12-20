import React from 'react';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Animated } from 'react-animated-css';
import { Row, Col } from 'react-bootstrap';
import Skeleton from '../../components/skeleton';
import { changeSection, showService, collapseProfileHeader } from './professionalProfileSlice';
import { selectService, hideSessionAlert } from '../booking/bookingSlice';
import ProfessionalServices from './professionalServices';
import DateTimePicker from '../../components/dateTimePicker';
import useContentLoaded from '../../components/hooks/useContentLoaded';
import ServiceCard from '../../components/services/serviceCard';
import { getServiceById, getServiceByModalityType } from '../../helpers/data';
import AlertPopUp from '../../components/alertPopUp';

const mapDispatchToProps = {
  selectService,
  changeSection,
  showService,
  collapseProfileHeader,
  hideSessionAlert
};
const mapStateToProps = state => {
  const booking = state.booking;
  return {
    profile: state.professionalProfile,
    loading: state.professionalProfile.loading,
    booking
  }
}

const SectionContentWrapper = styled.div`
  /* padding-bottom: 65px; */
  .text {
    height: auto;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    align-content: flex-end;
    text-align: center;
    p {
      margin-bottom: auto;
    }
  }
`;

const ProfessionalProfileSection = ({
  profile,
  collapseProfileHeader,
  showService,
  selectService,
  changeSection,
  booking,
  slug,
  hideSessionAlert,
  loading
}) => {
  const { t } = useTranslation();

  const loaded = useContentLoaded(loading);

  const profileServices = loaded && profile.services && profile.services.length ? profile.services : null;

  function onSelectService(e, payload) {
    collapseProfileHeader(true);
    selectService(payload);
    changeSection('datePicker');
    e.stopPropagation();
  }

  let sectionContent;
  if (profile.section === 'serviceList') {
    sectionContent = (
      <>
        <Row className='text'>
          <Col xs='12' md='12'>
            {profile.collapseProfileHeader ?
              <Animated animateOnMount={true} animationIn='fadeIn' animationInDelay={350}>
                <p className='modality-text'>{t('Pick the modality')}</p>
              </Animated>
              :
              <>
                <p>{t('Do you want to contact me?')}</p>
                <p>{t('These are my services')}</p>
              </>}
          </Col>
        </Row>
        {profileServices ?
          <ProfessionalServices services={profileServices}
            serviceId={profile.showedServiceId}
            onClick={id => {
              if (profile.services.length > 1) {
                collapseProfileHeader(true);
                showService(id);
              }
            }} onSelect={onSelectService} />
          :
          <Skeleton height={45} count={3} />}
      </>
    );
  } else if (profile.section === 'datePicker' && booking.serviceId) {
    const service = getServiceById(profile.services, booking.serviceId);
    const modality = getServiceByModalityType(service, booking.modalityType);
    sectionContent = (
      <>
        <Row>
          <Col>
            <ServiceCard serviceName={service.name}
              modality={modality}
              onClick={() => changeSection('serviceList')} />
          </Col>
        </Row>
        <Row className='text'>
          <Col xs='12' md='12'>
            <p className='modality-text'>{t('When do you want your booking for?')}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <DateTimePicker slug={slug} />
          </Col>
        </Row>
        <AlertPopUp
          className='cancel-session-alert'
          show={booking.showSessionAlert}
          body={booking.sessionAlertMessage}
          onCancel={hideSessionAlert}
          onAccept={() => {
            hideSessionAlert();
            if (booking.keepGoingAfterShowingAlert) {
              navigate(`/profile/payment${slug ? `?slug=${slug}` : ''}`);
            }
          }} />
      </>
    );
  }

  if (sectionContent) {
    return <SectionContentWrapper>{sectionContent}</SectionContentWrapper>;
  } else {
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalProfileSection);