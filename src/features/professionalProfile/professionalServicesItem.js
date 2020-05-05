import React from 'react';
import styled from 'styled-components';
import { Accordion, Card } from 'react-bootstrap';
import theme from '../../theme';

const ProfessionalServicesListItem = styled.div`
  margin: 0;
  padding: 0;
  .card-header {
    background-color: ${theme.backgroundCardHeaderColor};
    color: ${theme.textCardHeaderColor};
  }
`;

export default ({ service }) => {
  return (
    <ProfessionalServicesListItem>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={service.id}>
          {service.name}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={service.id}>
          <Card.Body>Service details</Card.Body>
        </Accordion.Collapse>
      </Card>
    </ProfessionalServicesListItem>
  );
}