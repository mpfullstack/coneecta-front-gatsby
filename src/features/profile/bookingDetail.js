import React from 'react';
import SEO from "../../components/seo";

const BookingDetail = ({ id }) => {
  return (
    <div>
      <SEO title="Reservas" />
      <h1>Datos de la reserva</h1>
      <p>{id}</p>
    </div>
  );
}

export default BookingDetail;