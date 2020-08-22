import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import SEO from "../../components/seo";
import { loadSessions } from './profileSlice';
import Skeleton from '../../components/skeleton';
import Pagination from '../../components/pagination';

const mapDispatchToProps = { loadSessions };
const mapStateToProps = ({ profile }) => {
  return {
    sessions: profile.sessions,
    loading: profile.loadingSessions
  }
}

const BookingItemWrapper = styled.div`
  margin-bottom: 20px;
`;

const BookingItem = ({ session = null }) => {
  return (
    <BookingItemWrapper>
      <div className='status'>
        {session ?
          session.status
          : <Skeleton width={'55%'} height={30} />}
      </div>
      <div className='date'>
        {session ?
          format(new Date(session.date), "d 'de' LLLL 'de' yyyy", { locale: es })
          : <Skeleton height={25} />}
      </div>
      <div className='name'>
        {session ?
          session.name
          : <Skeleton height={25} />}
      </div>
      <div className='teacher'>
        {session ?
          session.teacher
          : <Skeleton height={25} />}
      </div>
    </BookingItemWrapper>
  );
}

const BookingList = ({ loadSessions, sessions, loadingSessions }) => {
  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  const sessionsPagination = sessions ? sessions.pagination : null;
  const profileSessions = sessions ? sessions.items : [];

  return (
    <div>
      <SEO title="Reservas" />
      <h1>Reservas</h1>
      <Row className={`justify-content-md-center`} style={{marginTop: '30px'}}>
        <Col xs='12' md='10'>
          {profileSessions ?
            profileSessions.map(session => <BookingItem key={`session-${session.id}`} session={session} />)
            :
            Array.from({length: 3}).map((u, i) => <BookingItem key={`session-${i}`} />)
          }
        </Col>
      </Row>
      <Row className={`justify-content-md-center`} style={{marginTop: '30px'}}>
        <Col xs='12' md='10'>
          {sessionsPagination && !loadingSessions ?
            <Pagination
              pages={sessionsPagination.total_pages}
              currentPage={sessionsPagination.current_page}
              onPaginationClick={page => loadSessions({ page })} /> : <Skeleton height={25} />}
        </Col>
      </Row>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingList);