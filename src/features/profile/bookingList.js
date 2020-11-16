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
import useContentLoaded from '../../components/hooks/useContentLoaded';
import { clearBooking } from '../booking/bookingSlice';

const mapDispatchToProps = { loadSessions, clearBooking };
const mapStateToProps = ({ profile }) => {
  return {
    sessions: profile.sessions,
    loading: profile.loadingSessions
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

const BookingList = ({ clearBooking, loadSessions, sessions, loading }) => {
  const { t } = useTranslation();

  useEffect(() => {
    clearBooking();
    loadSessions();
  }, [loadSessions, clearBooking]);

  const sessionsPagination = sessions ? sessions.pagination : null;
  const profileSessions = sessions ? sessions.items : null;

  const loaded = useContentLoaded(loading);

  return (
    <BookingListWrapper>
      <SEO title="Reservas" />
      <h1 className='title'>Reservas</h1>
      <Row className={`justify-content-md-center`} style={{marginTop: '30px'}}>
        <Col xs='12' md='10'>
          {loaded ?
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