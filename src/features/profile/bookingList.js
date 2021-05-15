import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import SEO from "../../components/seo";
import { loadSessions } from './profileSlice';
import { useTranslation } from 'react-i18next';
import Skeleton from '../../components/skeleton';
import Pagination from '../../components/pagination';
import BookingItem from './bookingItem';
import PendingBooking from './pendingBooking';
import useContentLoaded from '../../components/hooks/useContentLoaded';
import { clearBooking } from '../booking/bookingSlice';
import { getIsBookingPending, getServiceById } from '../../helpers/data';

const mapDispatchToProps = { loadSessions, clearBooking };
const mapStateToProps = ({ booking, profile, professionalProfile }) => {
  return {
    sessions: profile.sessions,
    loading: profile.loadingSessions,
    booking,
    slug: professionalProfile.slug,
    services: professionalProfile.services,
    professionalName: professionalProfile.details?.name
  }
}

const BookingListWrapper = styled.div`
  .react-loading-skeleton {
    margin-bottom: 0;
  }
  .no-bookings {
    text-align: center;
  }
`;

const BookingList = ({ clearBooking, services, professionalName, slug, booking, loadSessions, sessions, loading }) => {
  const { t } = useTranslation();

  useEffect(() => {
    // clearBooking();
    loadSessions();
  }, [loadSessions]);

  const sessionsPagination = sessions ? sessions.pagination : null;
  const profileSessions = sessions ? sessions.items : null;
  const isBookingPending = getIsBookingPending({ ...booking, slug });
  const service = getServiceById(services, booking.serviceId);

  const loaded = useContentLoaded(loading);

  return (
    <BookingListWrapper>
      <SEO title="Reservas" />
      {isBookingPending ?
        <PendingBooking
          date={booking.date}
          serviceName={service.name}
          slug={slug}
          professionalName={professionalName}
          onDiscard={() => clearBooking()} /> : null}

      <h1 className='title'>Reservas</h1>
      <Row className={`justify-content-md-center`} style={{marginTop: '30px'}}>
        <Col xs='12' md='10'>
          {loaded && profileSessions ?
             profileSessions.length ?
              profileSessions.map(session => <BookingItem key={`session-${session.id}`} session={session} />)
              :
              <p className='no-bookings'>{t('youHaveNoBookings')}</p>
            :
            Array.from({length: 3}).map((u, i) => <BookingItem key={`session-${i}`} />)
          }
        </Col>
      </Row>
      <Row className={`justify-content-md-center`} style={{marginTop: '30px'}}>
        <Col xs='12' md='10'>
          {sessionsPagination && loaded && sessionsPagination.total_pages > 0 ?
            <Pagination
              pages={sessionsPagination.total_pages}
              currentPage={sessionsPagination.current_page}
              onPaginationClick={page => loadSessions({ page })} /> :
              loading ? <Skeleton height={25} /> : null}
        </Col>
      </Row>
    </BookingListWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingList);