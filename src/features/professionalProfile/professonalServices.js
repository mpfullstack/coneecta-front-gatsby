import React from 'react';
import styled from 'styled-components';

const ProfessionalServicesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ProfessionalServicesListItem = styled.li`
  margin: 10px 0;
  padding: 0;
`;

export default ({ services }) => {
  return (
    <ProfessionalServicesList>
      {
        services.map(service => {
          return <ProfessionalServicesListItem key={service.id}>{service.name}</ProfessionalServicesListItem>;
        })
      }
    </ProfessionalServicesList>
  );
}