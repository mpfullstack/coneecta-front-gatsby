import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Skeleton from '../../components/skeleton';
import theme from '../../theme';

const BookingItemWrapper = styled.div`
  margin-bottom: 20px;
  border: 1px solid ${theme.boxBackgroundColor};
  border-radius: 5px;
  background-color: ${theme.boxBackgroundColor};
  padding: 10px;
  min-height: 131px;
  a {
    display: block;
    width: 100%;
    &:hover {
      text-decoration: none;
    }
  }
  .status {
    width: auto;
    border-radius: 5px;
    padding: 5px 10px;
    color: ${theme.statusTextColor};
    text-transform: uppercase;
    display: inline-block;
    font-weight: 800;
    font-size: 16px;
    margin-bottom: 10px;
    &.approved {
      background-color: ${theme.approvedStatusColor};
    }
    &.unapproved {
      background-color: ${theme.unapprovedStatusColor};
    }
  }
  .text {
    font-size: 17px;
    color: ${theme.textColor};
  }
  .date {
    font-style: italic;
  }
  .name {
    font-weight: 800;
  }
`;

const BookingItem = ({ linkable = true, session = null }) => {
  if (session) {
    const item = (
      <>
        <div className={`status ${session.status}`}>
          {session.status}
        </div>
        <div className='text date'>
          {format(new Date(session.date), "d 'de' LLLL 'de' yyyy · H:mm 'horas'", { locale: es })}
        </div>
        <div className='text name'>
          {session.name}
        </div>
        <div className='text teacher'>
          {session.teacher}
        </div>
      </>
    );

    return (
      <BookingItemWrapper>
        {linkable ?
          <Link to={`/profile/bookings/${session.id}`}>
            {item}
          </Link>
        : item}
      </BookingItemWrapper>
    );
  } else {
    return (
      <div style={{marginBottom: '20px'}}>
        <Skeleton height={131} width={'100%'} />
      </div>
    );
  }
}

export default BookingItem;