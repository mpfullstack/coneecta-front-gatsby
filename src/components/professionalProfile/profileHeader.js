import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { Animated } from 'react-animated-css';
import Skeleton from 'react-loading-skeleton';
import { useTranslation } from 'react-i18next';
import ImageSkeleton from '../imageSkeleton';
import ProfileImgWrapper from './profileImgWrapper.styles';
import Rating from '../rating';

const ProfileHeaderWrapper = styled.div`
  padding: 20px 0 0;
  .name {
    font-size: 26px;
    text-transform: uppercase;
    margin: 20px 0 0;
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
`;

const ProfileHeader = ({ name, profilePic, rating, collapse }) => {
  const { t } = useTranslation();

  return (
    <ProfileHeaderWrapper>
      <Row className='justify-content-md-center text-center'>
        <Col xs='12' md='10'>
          <ProfileImgWrapper>
            <ImageSkeleton url={profilePic} circle={true} width={124} height={124} />
          </ProfileImgWrapper>
        </Col>
      </Row>
      <Row className='justify-content-md-center text-center'>
        <Col xs='12' md='10'>
          <h2 className="name">{name || <Skeleton width={200} />}</h2>
          <Rating
            name={'rating'}
            value={3}
            starCount={5}
            editing={false}
          />
        </Col>
      </Row>
      <Row className='text'>
        <Col xs='12' md='10'>
          {collapse ?
            <Animated animateOnMount={true} animationIn="fadeInDown" isVisible={collapse}>
              <p>Eliga la modalidad</p>
            </Animated>
            : null}
          {!collapse ?
            <>
              <p>{t('Do you want to contact me?')}</p>
              <p>{t('These are my services')}</p>
            </>
            : null}
        </Col>
      </Row>
    </ProfileHeaderWrapper>
  );
}

export default ProfileHeader;