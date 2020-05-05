import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Accordion } from 'react-bootstrap';
import ProfessionalServicesItem from './professionalServicesItem';

const ProfessionalServicesList = styled.div`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ProfessionalServices = ({ services, onClick }) => {
  return (
    <ProfessionalServicesList onClick={() => onClick ? onClick() : null}>
      <Accordion>
        {
          services.map(service =>
            <ProfessionalServicesItem service={service}  key={service.id} />)
        }
      </Accordion>
    </ProfessionalServicesList>
  );
}

ProfessionalServices.propTypes = {
  services: PropTypes.array.isRequired
}

export default ProfessionalServices;