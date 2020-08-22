import React from 'react';
import SEO from "../../components/seo";

const BookingDetail = ({ id }) => {
  return (
    <div>
      <SEO title="Datos de la reserva" />
      <h1 className='title'>Datos de la reserva</h1>
      <p>{id}</p>
    </div>
  );
}

export default BookingDetail;