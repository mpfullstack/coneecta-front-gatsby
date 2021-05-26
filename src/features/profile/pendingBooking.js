import React from 'react';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import { BookingItemData } from './bookingItem';
import PrimaryButton from '../../components/buttons/primaryButton';
import SecondaryButton from '../../components/buttons/secondaryButton';

const PendingBookingWrapper = styled.div`
  .actions {
    display: flex;
    justify-content: space-around;
  }
`;

export const PendingBooking = ({ date, serviceName, slug, professionalName, onDiscard }) => {
  return (
    <PendingBookingWrapper>
      <h1 className='title'>Reserva sin finalizar</h1>
      <p>Tienes una reserva pendiente de confirmar, puedes continuar y terminarla o descartarla.</p>
      <BookingItemData
        date={date}
        serviceName={serviceName}
        slug={slug}
        professionalName={professionalName} />

      <div class="actions">
        <PrimaryButton  onClick={() => navigate(`/u/${slug}`)}>Continuar</PrimaryButton>
        <SecondaryButton  onClick={() => onDiscard()}>Descartar</SecondaryButton>
      </div>
    </PendingBookingWrapper>
  );
}

export default PendingBooking;