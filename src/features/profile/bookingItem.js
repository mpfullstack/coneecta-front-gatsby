import React from 'react';
import { Link, navigate } from 'gatsby';
import styled from 'styled-components';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Skeleton from '../../components/skeleton';
import theme from '../../theme';
import { useTranslation } from 'react-i18next';

const BookingItemWrapper = styled.div`
  margin-bottom: 20px;
  border: 1px solid ${theme.boxBackgroundColor};
  border-radius: 5px;
  background-color: ${theme.boxBackgroundColor};
  padding: 10px;
  min-height: 100px;
  .linkable {
    cursor: pointer;
  }
  a {
    display: block;
    width: 100%;
    &:hover {
      text-decoration: none;
    }
  }
  .status {
    width: auto;
    height: auto;
    border-radius: 5px;
    padding: 5px 10px;
    color: ${theme.statusTextColor};
    text-transform: uppercase;
    display: inline-block;
    font-weight: 800;
    font-size: 16px;
    margin-bottom: 10px;
    background-color: ${theme.deaultStatusColor};
    &.approved { background-color: ${theme.approvedStatusColor}; }
    &.unapproved { background-color: ${theme.unapprovedStatusColor}; }
    &.progress { background-color: ${theme.progressStatusColor}; }
    &.unreviewed { background-color: ${theme.unreviewedStatusColor}; }
    &.finalized { background-color: ${theme.finalizedStatusColor}; }
    &.cancelled { background-color: ${theme.deaultStatusColor}; }
    &.claimed { background-color: ${theme.claimedStatusColor}; }
  }
  .text {
    font-size: 17px;
    color: ${theme.textColor};
    a {
      border-bottom: 2px solid ${theme.textColor};
      display: inline;
    }
  }
  .date {
    font-style: italic;
  }
  .name {
    font-weight: 800;
  }
`;

export const BookingItemData = ({ status, date, serviceName, slug, professionalName }) => {
  const { t } = useTranslation();
  return (
    <BookingItemWrapper>
      {status ? <div className={`status ${status}`}>
        {t(status)}
      </div> : null}
      <div className='text date'>
        {format(new Date(date), "d 'de' LLLL 'de' yyyy · H:mm 'horas'", { locale: es })}
      </div>
      <div className='text name'>
        {serviceName}
      </div>
      <div className='text teacher'>
        <Link onClick={e => e.stopPropagation()} to={`/u/${slug}`}>{professionalName}</Link>
      </div>
    </BookingItemWrapper>
  );
}

const BookingItem = ({ linkable = true, session = null }) => {
  if (session) {
    const item = <BookingItemData
      status={session.status}
      date={session.date}
      serviceName={session.name}
      slug={session.teacher.slug}
      professionalName={session.teacher.name} />;

    let link = '';
    if (linkable) {
      link = `/profile/bookings/${session.id}`;
      if (session.status === 'unreviewed') {
        link += '/review';
      }
    }

    return (
      <>
        {linkable ?
          <div className='linkable' aria-hidden="true" onClick={() => navigate(link)} onKeyDown={e => null}>
            {item}
          </div>
        : item}
      </>
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