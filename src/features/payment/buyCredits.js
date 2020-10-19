import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
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
  return (
    <BuyCreditsWrapper>
      <Row className='buy-credits'>
        <Col xs='6'><strong>Comprar</strong></Col>
        <Col xs='6'>
          <Form.Control as="select" name='buyCredits' className='select-credits' onChange={onChange} value={credits} defaultValue={defaultCredits}>
            {Array.from({length: 60}, (x, i) => {
              return <option className='credit-option' key={`credits_${i}`} value={i*5}>{i*5} créditos</option>
            })}
          </Form.Control>
        </Col>
      </Row>
      <Row className='credits-legend'>
        <Col>10 créditos = 1,00 &euro;</Col>
      </Row>
    </BuyCreditsWrapper>
  );
};

export default BuyCredits;