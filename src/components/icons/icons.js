import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faAngleDown,
  faEdit,
  faExclamationCircle
 } from "@fortawesome/free-solid-svg-icons";

const ArrowLeft = () => <FontAwesomeIcon icon={faAngleLeft} />;
const ArrowRight = () => <FontAwesomeIcon icon={faAngleRight} />;
const ArrowUp = () => <FontAwesomeIcon icon={faAngleUp} />;
const ArrowDown = () => <FontAwesomeIcon icon={faAngleDown} />;
const Edit = () => <FontAwesomeIcon icon={faEdit} />;
const ExclamationCircle = () => <FontAwesomeIcon icon={faExclamationCircle} />;


const LowAvailabilityWrapper = styled.div`
  display: inline;
  .svg-inline--fa {
    color: #f19e1f;
  }
`;
const LowAvailability = () => {
  return (
    <LowAvailabilityWrapper>
      <ExclamationCircle />
    </LowAvailabilityWrapper>
  );
}

export {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Edit,
  ExclamationCircle,
  LowAvailability
}