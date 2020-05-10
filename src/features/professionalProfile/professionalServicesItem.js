import React from 'react';
import styled from 'styled-components';
import { Accordion, Card } from 'react-bootstrap';
import ServiceModalities from './serviceModalities';
import theme from '../../theme';

const ProfessionalServicesListItem = styled.div`
  margin: 0;
  padding: 0;
  .card {
    margin: 5px 0;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    border: 1px solid ${theme.borderCardColor};
    .card-header {
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      background-color: ${theme.backgroundCardHeaderColor};
      color: ${theme.textCardHeaderColor};
    }
    .card-body {
      padding: 10px 20px;
    }
  }
`;

export default ({ service, onSelect }) => {
  return (
    <ProfessionalServicesListItem>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={service.id}>
          {service.name}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={service.id}>
          <Card.Body>
            <ServiceModalities
              serviceId={service.id}
              modalities={service.modalities}
              onSelect={onSelect} />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </ProfessionalServicesListItem>
  );
}