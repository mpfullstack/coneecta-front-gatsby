import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faAngleDown,
  faEdit
 } from "@fortawesome/free-solid-svg-icons";

const ArrowLeft = () => <FontAwesomeIcon icon={faAngleLeft} />;
const ArrowRight = () => <FontAwesomeIcon icon={faAngleRight} />;
const ArrowUp = () => <FontAwesomeIcon icon={faAngleUp} />;
const ArrowDown = () => <FontAwesomeIcon icon={faAngleDown} />;
const Edit = () => <FontAwesomeIcon icon={faEdit} />;

export {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Edit
}