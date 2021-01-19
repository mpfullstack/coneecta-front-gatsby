import React from 'react';
import { Row, Col } from 'react-bootstrap';
import NumericInput from 'react-numeric-input';
import styled from 'styled-components';
import { FormControlWrapper } from '../../components/form/formControl';
import theme from '../../theme';

const BuyCreditsWrapper = styled.div`
  border: 1px solid ${theme.boxBackgroundColor};
  border-radius: 5px;
  background-color: ${theme.boxBackgroundColor};
  .buy-credits {
    padding: 5px 10px;
    align-items: baseline;
    .select-credits {
      .credit-option {
      }
    }
  }
  .credits-legend {
    padding: 0 10px;
    text-align: right;
  }
`;

const BuyCredits = ({ credits, defaultCredits, onChange }) => {
  if (!credits) {
    credits = defaultCredits;
  }
  return (
    <BuyCreditsWrapper>
      <Row className='buy-credits'>
        <Col xs='6'><strong>Comprar</strong></Col>
        <Col xs='6'>
          <FormControlWrapper>
            <NumericInput
              className='form-control' parse={parseInt} onChange={onChange} value={credits} strict={true} />
          </FormControlWrapper>
        </Col>
      </Row>
      <Row className='credits-legend'>
        <Col>10 créditos = 1,00 &euro;</Col>
      </Row>
    </BuyCreditsWrapper>
  );
};

export default BuyCredits;