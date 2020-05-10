import React from 'react';
import { connect } from 'react-redux';
import { collapseProfileHeader, changeSection } from './professionalProfileSlice';
import { selectService, selectDate, selectTime } from '../booking/bookingSlice';
import Skeleton from 'react-loading-skeleton';
import ProfessionalServices from './professionalServices';
import { Row, Col } from 'react-bootstrap';
import DateTimePicker from '../../components/dateTimePicker';

const mapDispatchToProps = { collapseProfileHeader, selectService, changeSection, selectDate, selectTime };
const mapStateToProps = state => {
  return {
    profile: state.professionalProfile,
    booking: state.booking
  }
}

const ProfessionalProfileSection = ({
  profile,
  collapseProfileHeader,
  selectService,
  changeSection,
  selectDate,
  selectTime,
  booking
}) => {
  const profileServices = profile.services && profile.services.length ? profile.services : null;

  function onSelectService(e, payload) {
    selectService(payload);
    changeSection('datePicker');
    e.stopPropagation();
  }

  if (profile.section === 'serviceList') {
    return (
      profileServices ?
      <ProfessionalServices services={profileServices} onClick={() =>collapseProfileHeader(true)} onSelect={onSelectService} />
      :
      <Skeleton height={45} count={3} />
    );
  } else if (profile.section === 'datePicker') {
    return (
      <Row>
        <Col>
          <DateTimePicker booking={booking} onSelectDate={selectDate} onSelectTime={selectTime} />
        </Col>
      </Row>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalProfileSection);