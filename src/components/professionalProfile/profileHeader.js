import React from 'react';
import { Link } from 'gatsby';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { Animated } from 'react-animated-css';
import Skeleton from '../skeleton';
import ImageSkeleton from '../imageSkeleton';
import ProfileImgWrapper from './profileImgWrapper.styles';
import Rating from '../rating';
import theme from '../../theme';
import AnimateHeight from 'react-animate-height';
import { isDevice } from '../../helpers/helpers';

const ProfileHeaderWrapper = styled.div`
  .collapse-image {
    .profile-image {
      margin-left: 10px;
      position: absolute;
    }
  }
  .profile-image {
    margin-top: 11px;
  }
  .name {
    font-size: 26px;
    text-transform: uppercase;
    margin: 14px 0 0 0;
    transition: padding-left 0.9s ease .6s;
    @media only screen and (max-width: ${theme.SIZES.M}) {
      &.collapse-name {
        padding-left: 55px;
        font-size: 22px;
      }
    }
  }
  .desktop {
    margin-top: 20px;
  }
  .dv-star-rating {
    cursor: pointer;
  }
`;

const ProfileHeader = ({ slug, serviceSlug, name, avatar, rating, collapse }) => {
  return (
    <AnimateHeight delay={0} duration={ 500 } height={isDevice() && collapse ? 87 : 240}>
      <ProfileHeaderWrapper>
        {/*
        * Profile image
        * --------------------------------------------------------------- */}
        {isDevice() ?
          <Row className={!collapse ? 'justify-content-md-center text-center' : 'collapse-image'}>
            <Col xs='12' md='10'>
              <ProfileImgWrapper>
                <AnimateHeight delay={0} duration={ 500 } height={collapse ? 1 : 150}>
                  {collapse ?
                    <Animated className='profile-image' key="1" animateOnMount={true} animationIn='fadeInLeft' animationInDelay={500}>
                      <ImageSkeleton url={avatar} circle={true} width={65} height={65} />
                    </Animated>
                    :
                    <Animated className='profile-image' key="2" animateOnMount={false} animationOut='fadeOutLeft'>
                      <ImageSkeleton url={avatar} circle={true} width={124} height={124} />
                    </Animated>}
                </AnimateHeight>
              </ProfileImgWrapper>
            </Col>
          </Row>
          :
          <Row className={'justify-content-md-center text-center desktop'}>
            <Col xs='12' md='10'>
              <ProfileImgWrapper>
                <ImageSkeleton url={avatar} circle={true} width={124} height={124} />
              </ProfileImgWrapper>
            </Col>
          </Row>
        }
        {/*
        * Profile name and rating component
        * --------------------------------------------------------------- */}
        <Row className={`justify-content-md-center text-center${collapse ?  ' collapsed' : ''}`}>
          <Col xs='12' md='10'>
            <Link to={`/u/${slug}${serviceSlug ? `/${serviceSlug}` : ''}`}>
              <h2 className={`name${collapse ? ' collapse-name' : ''}`}>{name || <Skeleton height={32} width={200} />}</h2>
            </Link>
            {!isNaN(parseInt(rating)) ?
              <AnimateHeight delay={0} duration={500} height={collapse ? 32 : 'auto'}>
                {/* <Animated animateOnMount={false} animationOut='fadeOutRight' isVisible={!collapse} animationOutDelay={0}> */}
                  <Link to={`/u/${slug}/reviews`}>
                    <Rating
                      name={'rating'}
                      value={rating}
                      starCount={5}
                      size={collapse ? 22 : undefined}
                      editing={false} />
                  </Link>
                {/* </Animated> */}
              </AnimateHeight>
              : <Skeleton height={24} width={110} />
            }
          </Col>
        </Row>
      </ProfileHeaderWrapper>
    </AnimateHeight>
  );
}

export default ProfileHeader;