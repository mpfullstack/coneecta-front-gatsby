import React from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { Location } from '@reach/router';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getServiceById, getServiceByModalityType } from '../../helpers/data';
import { pay, reserve } from './paymentSlice';
import PaymentLayout from '../../components/paymentLayout';
import Credits from './credits';
import BuyCredits from './buyCredits';
import PaymentButton from './paymentButton';
import SEO from "../../components/seo";

const mapDispatchToProps = {
  pay,
  reserve
};
const mapStateToProps = ({ profile, payment, booking, professionalProfile }) => {
  const serviceModality = getServiceByModalityType(
    getServiceById(professionalProfile.services, booking.serviceId),
    booking.modalityType
  );
  const profileDetails = profile.details || {};
  return {
    booking,
    payment,
    availableCredits: profileDetails.credits,
    creditsToPay: serviceModality.credits,
    directReserve: profileDetails.credits >= serviceModality.credits ? true : false
  }
}

const Payment = ({ payment, directReserve, creditsToPay = '', availableCredits = '', pay, reserve, booking }) => {
  const { t } = useTranslation();

  function buildReservationData() {
    return {
      'service': booking.serviceId,
      'modality': booking.modalityType,
      'datetime': `${format(new Date(booking.date), 'yyyymmdd')}${booking.time}`
    };
  }

  return (
    <Location>
      {props => {
        return (
          <PaymentLayout {...props}>
            <SEO title="Pagar" />
            <Credits toPay={creditsToPay} available={availableCredits} />
            {/* <BuyCredits /> */}
            <Row style={{marginTop: '40px'}}>
              <Col>
                {t('toClickOn')} <strong>{t('pay').toLowerCase()}</strong> {t('willProcessYourBooking')}
              </Col>
            </Row>
            <PaymentButton status={payment.status} onClick={() => {
              if (directReserve) {
                reserve(buildReservationData());
              } else {
                pay(buildReservationData());
              }
            }}/>
          </PaymentLayout>
        );
      }}
    </Location>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);