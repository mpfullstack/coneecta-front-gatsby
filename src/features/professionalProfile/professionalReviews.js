import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { loadProfile } from './professionalProfileSlice';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/seo';
import Skeleton from '../../components/skeleton';
import Rating from '../../components/rating';
import ProfileHeader from '../../components/professionalProfile/profileHeader';

const mapDispatchToProps = { loadProfile };
const mapStateToProps = state => {
  return {
    profile: state.professionalProfile,
    global: state.global
  }
}
const ReviewWrapper = styled.div`
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  .name-date {
    .name {
      font-size: 19px;
    }
    .date {
      font-size: 16px;
      margin-left: 7px;
      &:before {
        content: '-';
        position: relative;
        left: -3px;
      }
    }
  }
  .rating {
    label {
      font-size: 22px;
    }
  }
`;

const Review = ({ review = null }) => {
  return (
    <ReviewWrapper>
      <div className='name-date'>
        {review ?
          <>
            <span className='name'>{review.name}</span>
            <span className='date'>{review.date}</span>
          </>
          : <Skeleton width={'55%'} height={30} />}
      </div>
      <div className='rating'>
        {review ?
          <Rating name={'rating'} value={review.rating}
            starCount={5} editing={false} />
          : <Skeleton width={'100px'} height={25} />}
      </div>
      <div className='comments'>
        {review ?
          review.comments
          : <Skeleton height={70} />}
      </div>
    </ReviewWrapper>
  );
}

export const ProfessionalReviews = ({ profile, loadProfile, location, slug, serviceSlug }) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (!profile.id) {
      if (slug !== '') {
        loadProfile({id: slug, sid: serviceSlug}); // TODO: Get sid from path instead of querystring
      } else {
        // TODO: Handle if no professional id is present in URL
      }
    }
  }, [loadProfile, location, profile.id, slug, serviceSlug]);

  const profileDetails = profile.details || {};
  const profileReviews = profile.reviews || null;

  return (
    <Container>
      <SEO title={t('Professional reviews')} />
      <ProfileHeader id={profile.id} {...profileDetails} collapse={true} slug={slug} serviceSlug={serviceSlug} />
      <Row>
        <Col>
          <h2>{t('Reviews')}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          {profileReviews ?
            profileReviews.map((review, i) => <Review key={`review-${i}`} review={review} />)
            :
            Array.from({length: 3}).map((u, i) => <Review key={`review-${i}`} />)
          }
        </Col>
      </Row>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalReviews);