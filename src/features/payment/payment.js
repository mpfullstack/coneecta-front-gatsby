import React from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { Location } from '@reach/router';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getServiceById, getServiceByModalityType } from '../../helpers/data';
import { checkout, reserve, updateCredits } from './paymentSlice';
import PaymentLayout from '../../components/paymentLayout';
import Credits from './credits';
import BuyCredits from './buyCredits';
import PaymentButton from './paymentButton';
import SEO from "../../components/seo";

const mapDispatchToProps = {
  checkout,
  reserve,
  updateCredits
};
const mapStateToProps = ({ profile, payment, booking, professionalProfile }) => {
  const serviceModality = getServiceByModalityType(
    getServiceById(professionalProfile.services, booking.serviceId),
    booking.modalityType
  );
  const profileDetails = profile.details || {};
  let defaultCredits;
  if (profileDetails.credits < serviceModality.credits) {
    defaultCredits = serviceModality.credits - profileDetails.credits;
  }
  return {
    booking,
    payment,
    availableCredits: profileDetails.credits,
    creditsToPay: serviceModality.credits,
    defaultCredits,
    creditsToBuy: payment.credits || defaultCredits,
    directReserve: profileDetails.credits >= serviceModality.credits ? true : false
  }
}

const Payment = ({
  payment, directReserve, creditsToPay = '', availableCredits = '',
  defaultCredits, creditsToBuy, checkout, reserve, booking, updateCredits
}) => {
  const { t } = useTranslation();

  function buildReservationData() {
    return {
      'service': booking.serviceId,
      'modality': booking.modalityType,
      'datetime': `${format(new Date(booking.date), 'yyyyMMdd')}${booking.time.replace(':','')}`
    };
  }

  function renderPaymentOption() {
    if (directReserve) {
      return (
        <Row style={{marginTop: '40px'}}>
          <Col>
            {t('toClickOn')} <strong>{t('pay').toLowerCase()}</strong> {t('willProcessYourBooking')}
          </Col>
        </Row>
      );
    } else {
      return (
        <Row>
          <Col>
            <BuyCredits credits={creditsToBuy} defaultCredits={defaultCredits} onChange={
              e => updateCredits(e.target.value)
            }/>
          </Col>
        </Row>
      );
    }
  }

  return (
    <Location>
      {props => {
        return (
          <PaymentLayout {...props}>
            <SEO title="Pagar" />
            <Credits toPay={creditsToPay} available={availableCredits} />
            {renderPaymentOption()}
            <PaymentButton status={payment.status} onClick={() => {
              if (directReserve) {
                reserve(buildReservationData());
              } else {
                updateCredits(creditsToBuy);
                checkout(creditsToBuy);
              }
            }}/>
          </PaymentLayout>
        );
      }}
    </Location>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);