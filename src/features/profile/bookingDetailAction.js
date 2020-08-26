import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { loadSessionDetail, performSessionAction } from './profileSlice';
import DateTimePicker from '../../components/dateTimePicker';

const mapDispatchToProps = { performSessionAction };
const mapStateToProps = ({ profile }) => {
  return {}
}

const BookingDetailActionWrapper = styled.div`
`;

const BookingDetailAction = ({ id, action, performSessionAction }) => {
  const { t } = useTranslation();

  useEffect(() => {
    loadSessionDetail(id);
  }, [loadSessionDetail, id]);

  function renderAction(action) {
    if (action === 'modify') {
      return (
        <div>
          <p>{t('When do you want to change your booking for?')}</p>
          <DateTimePicker />
        </div>
      );
    }
  }

  return (
    <BookingDetailActionWrapper>
      <Row className={`justify-content-md-center`}>
        <Col xs='12' md='10'>
          {renderAction(action)}
        </Col>
      </Row>
    </BookingDetailActionWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetailAction);