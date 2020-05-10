import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Animated } from 'react-animated-css';
import Skeleton from 'react-loading-skeleton';
import { Row, Col } from 'react-bootstrap';
import { collapseProfileHeader, changeSection } from './professionalProfileSlice';
import { selectService, selectDate, selectTime } from '../booking/bookingSlice';
import ProfessionalServices from './professionalServices';
import DateTimePicker from '../../components/dateTimePicker';
import ServiceCard from '../../components/services/serviceCard';

const mapDispatchToProps = { collapseProfileHeader, selectService, changeSection, selectDate, selectTime };
const mapStateToProps = state => {
  return {
    profile: state.professionalProfile,
    booking: state.booking
  }
}

const SectionContentWrapper = styled.div`
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
  selectService,
  changeSection,
  selectDate,
  selectTime,
  booking
}) => {
  const { t } = useTranslation();
  const profileServices = profile.services && profile.services.length ? profile.services : null;

  function onSelectService(e, payload) {
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
              <Animated animateOnMount={true} animationIn='fadeInLeft' animationInDelay={600}>
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
          <ProfessionalServices services={profileServices} onClick={() =>collapseProfileHeader(true)} onSelect={onSelectService} />
          :
          <Skeleton height={45} count={3} />}
      </>
    );
  } else if (profile.section === 'datePicker') {
    sectionContent = (
      <>
        <Row>
          <Col>
            <ServiceCard serviceName={'Some service'} modality={{
              type: 'videoconference',
              duration: '40 min',
              price: '35 €'
            }}
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
            <DateTimePicker booking={booking} onSelectDate={selectDate} onSelectTime={selectTime} />
          </Col>
        </Row>
      </>
    );
  }

  return <SectionContentWrapper>{sectionContent}</SectionContentWrapper>;
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalProfileSection);