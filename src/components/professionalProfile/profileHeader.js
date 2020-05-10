import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { Animated } from 'react-animated-css';
import Skeleton from 'react-loading-skeleton';
import { useTranslation } from 'react-i18next';
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
    transition: all 0.9s ease .7s;
    &.collapse-name {
      padding-left: 70px;
    }
  }
  .text {
    height: 50px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    align-content: flex-end;
    text-align: center;
    p {
      margin-bottom: auto;
    }
  }
  .modality-text {
    margin-top: 25px;
  }
`;

const ProfileHeader = ({ name, profilePic, rating, collapse }) => {
  const { t } = useTranslation();

  return (
    <AnimateHeight delay={0} duration={ 500 } height={collapse ? 145 : 315}>
      <ProfileHeaderWrapper>
        <Row className={!collapse ? 'justify-content-md-center text-center' : 'collapse-image'}>
          <Col xs='12' md='10'>
            <ProfileImgWrapper>
              <AnimateHeight delay={0} duration={ 500 } height={collapse ? 32 : 150}>
                {collapse ?
                  <Animated className='profile-image' key="1" animateOnMount={true} animationIn='fadeInLeft' animationInDelay={500}>
                    <ImageSkeleton url={profilePic} circle={true} width={75} height={75} />
                  </Animated>
                  :
                  <Animated className='profile-image' key="2" animateOnMount={false} animationOut='fadeOutLeft'>
                    <ImageSkeleton url={profilePic} circle={true} width={124} height={124} />
                  </Animated>}
              </AnimateHeight>
            </ProfileImgWrapper>
          </Col>
        </Row>
        <Row className='justify-content-md-center text-center'>
          {/* <Col xs={collapse ? {offset: 2} : '12'} md='10'> */}
          <Col xs='12' md='10'>
            <h2 className={`name${collapse ? ' collapse-name' : ''}`}>{name || <Skeleton height={32} width={200} />}</h2>
            {rating ?
              <AnimateHeight delay={400} duration={500} height={collapse ? 0 : 'auto'}>
                <Animated animateOnMount={false} animationOut='fadeOutRight' isVisible={!collapse} animationOutDelay={250}>
                  <Rating
                    name={'rating'}
                    value={rating}
                    starCount={5}
                    editing={false}
                  />
                </Animated>
              </AnimateHeight>
              : <Skeleton height={28} width={110} />
            }
            {collapse ?
              <Animated animateOnMount={true} animationIn='fadeInLeft' animationInDelay={600}>
                <p className='modality-text'>{t('Pick the modality')}</p>
              </Animated>
              : null}
          </Col>
        </Row>
        <Row className='text'>
          <Col xs='12' md='12'>
            {!collapse ?
              <>
                <p>{t('Do you want to contact me?')}</p>
                <p>{t('These are my services')}</p>
              </>
              : null}
          </Col>
        </Row>
      </ProfileHeaderWrapper>
    </AnimateHeight>
  );
}

export default ProfileHeader;