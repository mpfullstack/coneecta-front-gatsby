import React from 'react'
import styled from 'styled-components';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import { LowAvailability } from './icons';

const BookingReviewWrapper = styled.div`
  min-height: 100px;
  .availability {
    min-height: 55px;
    margin: 0;
    padding: 0;
  }
  .msg {
    font-size: 15px;
    font-style: italic;
    opacity: .9;
  }
  .block {
    white-space: nowrap;
  }
  .centered {
    text-align: center;
  }
`;

const BookingReview = ({ booking }) => {
  const { t } = useTranslation();

  if (booking.date && booking.time) {
    return (
      <BookingReviewWrapper>
        <p className='availability centered'>
          {!booking.isTimeAvailable ? <><LowAvailability /> <span className='msg'>{t('lowAvailabilityMessage')}</span></> : null}
        </p>
        <p className='centered'>Reserva para el <strong>{format(new Date(booking.date), "EEEE d 'de' MMMM 'de' yyyy", { locale: es })}</strong>
        {` `}a las <strong className='block'>{booking.time} ({booking.timezone})</strong></p>
      </BookingReviewWrapper>
    )
  } else {
    return null;
  }
}

export default BookingReview;