import React from 'react';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Row, Col } from 'react-bootstrap';
import { changeSection } from '../professionalProfile/professionalProfileSlice';
import ServiceCard from '../../components/services/serviceCard';
import DateTimeCard from '../../components/services/dateTimeCard';
import { getServiceById, getServiceByModalityType } from '../../helpers/data';
import { capitalise } from '../../helpers/helpers';

const mapDispatchToProps = { changeSection };
const mapStateToProps = state => {
  return {
    profile: state.professionalProfile,
    global: state.global,
    booking: state.booking
  }
}

export const Booking = ({ profile, booking, changeSection, slug }) => {
  if (profile.services && booking.serviceId) {
    const service = getServiceById(profile.services, booking.serviceId);
    const modality = getServiceByModalityType(service, booking.modalityType);

    return (
      <Row className='justify-content-md-center'>
        <Col xs='12' md='10'>
          <Row>
            <Col>
              <ServiceCard serviceName={service.name}
                modality={modality}
                onClick={() => {
                  changeSection('serviceList');
                  navigate(`/u/${slug}`);
                }} />
              <DateTimeCard
                date={capitalise(format(new Date(booking.date), "EEEE dd 'de' LLLL 'de' yyyy", { locale: es }))}
                time={booking.time}
                timezone={booking.timezone}
                onClick={() => {
                  changeSection('datePicker');
                  navigate(`/u/${slug}`);
                }} />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  } else {
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Booking);