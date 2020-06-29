import React from 'react';
import { Location } from '@reach/router';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import PaymentLayout from '../../components/paymentLayout';
import Credits from './credits';
import BuyCredits from './buyCredits';
import PaymentButton from './paymentButton';
import SEO from "../../components/seo";

const Payment = () => {
  const { t } = useTranslation();

  return (
    <Location>
      {props => {
        return (
          <PaymentLayout {...props}>
            <SEO title="Pagar" />
            <Credits toPay={80} available={100} />
            {/* <BuyCredits /> */}
            <Row style={{marginTop: '40px'}}>
              <Col>
                {t('toClickOn')} <strong>{t('pay').toLowerCase()}</strong> {t('willProcessYourBooking')}
              </Col>
            </Row>
            <PaymentButton />
          </PaymentLayout>
        );
      }}
    </Location>
  );
}

export default Payment;