import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { Animated } from 'react-animated-css';
import Skeleton from 'react-loading-skeleton';
import ImageSkeleton from '../imageSkeleton';
import ProfileImgWrapper from './profileImgWrapper.styles';
import Rating from '../rating';
import AnimateHeight from 'react-animate-height';

const ProfileHeaderWrapper = styled.div`
  padding: 10px 0 0;
  .collapse-image {
    .profile-image {
      margin-left: 10px;
      position: absolute;
    }
  }
  .profile-image {
    margin-top: 10px;
  }
  .name {
    font-size: 26px;
    text-transform: uppercase;
    margin: 10px 0 0 0;
    transition: all 0.9s ease .6s;
    &.collapse-name {
      padding-left: 70px;
    }
  }
`;

const ProfileHeader = ({ name, avatar, rating, collapse }) => {
  return (
    <AnimateHeight delay={0} duration={ 500 } height={collapse ? 100 : 240}>
      <ProfileHeaderWrapper>
        {/*
        * Profile image
        * --------------------------------------------------------------- */}
        <Row className={!collapse ? 'justify-content-md-center text-center' : 'collapse-image'}>
          <Col xs='12' md='10'>
            <ProfileImgWrapper>
              <AnimateHeight delay={0} duration={ 500 } height={collapse ? 32 : 150}>
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
        {/*
        * Profile name and rating component
        * --------------------------------------------------------------- */}
        <Row className='justify-content-md-center text-center'>
          <Col xs='12' md='10'>
            <h2 className={`name${collapse ? ' collapse-name' : ''}`}>{name || <Skeleton height={32} width={200} />}</h2>
            {rating ?
              <AnimateHeight delay={0} duration={500} height={collapse ? 0 : 'auto'}>
                <Animated animateOnMount={false} animationOut='fadeOutRight' isVisible={!collapse} animationOutDelay={0}>
                  <Rating
                    name={'rating'}
                    value={rating}
                    starCount={5}
                    editing={false}
                  />
                </Animated>
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