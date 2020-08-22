import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import SEO from "../../components/seo";
import { loadSessions } from './profileSlice';
import Skeleton from '../../components/skeleton';
import Pagination from '../../components/pagination';
import theme from '../../theme';

const mapDispatchToProps = { loadSessions };
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
`;

const BookingItemWrapper = styled.div`
  margin-bottom: 20px;
  border: 1px solid ${theme.boxBackgroundColor};
  border-radius: 5px;
  background-color: ${theme.boxBackgroundColor};
  padding: 10px;
  min-height: 131px;
  a:hover {
    text-decoration: none;
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

const BookingItem = ({ session = null }) => {
  if (session) {
    return (
      <BookingItemWrapper>
        <Link to={`/profile/bookings/${session.id}`}>
          <div className={`status ${session.status}`}>
            {session.status}
          </div>
          <div className='text date'>
            {format(new Date(session.date), "d 'de' LLLL 'de' yyyy", { locale: es })}
          </div>
          <div className='text name'>
            {session.name}
          </div>
          <div className='text teacher'>
            {session.teacher}
          </div>
        </Link>
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

const BookingList = ({ loadSessions, sessions, loading }) => {
  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  const sessionsPagination = sessions ? sessions.pagination : null;
  const profileSessions = sessions ? sessions.items : [];

  return (
    <BookingListWrapper>
      <SEO title="Reservas" />
      <h1 className='title'>Reservas</h1>
      <Row className={`justify-content-md-center`} style={{marginTop: '30px'}}>
        <Col xs='12' md='10'>
          {profileSessions && !loading ?
            profileSessions.map(session => <BookingItem key={`session-${session.id}`} session={session} />)
            :
            Array.from({length: 3}).map((u, i) => <BookingItem key={`session-${i}`} />)
          }
        </Col>
      </Row>
      <Row className={`justify-content-md-center`} style={{marginTop: '30px'}}>
        <Col xs='12' md='10'>
          {sessionsPagination && !loading ?
            <Pagination
              pages={sessionsPagination.total_pages}
              currentPage={sessionsPagination.current_page}
              onPaginationClick={page => loadSessions({ page })} /> : <Skeleton height={25} />}
        </Col>
      </Row>
    </BookingListWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingList);