import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import SEO from "../../components/seo";
import { loadSessionDetail } from './profileSlice';
import Skeleton from '../../components/skeleton';
import BookingItem from './bookingItem';

const mapDispatchToProps = { loadSessionDetail };
const mapStateToProps = ({ profile }) => {
  return {}
}

const BookingDetailWrapper = styled.div`
`;

const BookingDetail = ({ id, loadSessionDetail }) => {
  useEffect(() => {
    loadSessionDetail(id);
  }, [loadSessionDetail, id]);

  return (
    <BookingDetailWrapper>
      <SEO title="Datos de la reserva" />
      <h1 className='title'>Datos de la reserva</h1>
      <Row className={`justify-content-md-center`} style={{marginTop: '30px'}}>
        <Col xs='12' md='10'>
          {/* <BookingItem session={session} linkable={false} /> */}
        </Col>
      </Row>
    </BookingDetailWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetail);