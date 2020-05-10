import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faEdit } from "@fortawesome/free-solid-svg-icons";

const ArrowLeft = () => <FontAwesomeIcon icon={faAngleLeft} />;
const ArrowRight = () => <FontAwesomeIcon icon={faAngleRight} />;
const Edit = () => <FontAwesomeIcon icon={faEdit} />;

export {
  ArrowLeft,
  ArrowRight,
  Edit
}