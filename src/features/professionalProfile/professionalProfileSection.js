import React from 'react';
import { connect } from 'react-redux';
import { collapseProfileHeader, changeSection } from './professionalProfileSlice';
import { selectService } from '../booking/bookingSlice';
import Skeleton from 'react-loading-skeleton';
import ProfessionalServices from './professionalServices';
import { Row, Col } from 'react-bootstrap';
import DateTimePicker from '../../components/dateTimePicker';

const mapDispatchToProps = { collapseProfileHeader, selectService, changeSection };
const mapStateToProps = state => {
  return {
    profile: state.professionalProfile,
    booking: state.booking
  }
}

const ProfessionalProfileSection = ({ profile, collapseProfileHeader, selectService, changeSection, booking }) => {
  const profileServices = profile.services && profile.services.length ? profile.services : null;

  function onSelectService(e, payload) {
    selectService(payload);
    changeSection('datePicker');
    e.stopPropagation();
  }

  if (profile.section === 'serviceList') {
    return (
      profileServices ?
      <ProfessionalServices services={profileServices} onClick={collapseProfileHeader} onSelect={onSelectService} />
      :
      <Skeleton height={24} count={4} />
    );
  } else if (profile.section === 'datePicker') {
    return (
      <Row>
        <Col>
          <DateTimePicker booking={booking} />
        </Col>
      </Row>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalProfileSection);