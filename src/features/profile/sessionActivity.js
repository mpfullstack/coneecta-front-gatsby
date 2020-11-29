import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Skeleton from '../../components/skeleton';
import ImageSkeleton from '../../components/imageSkeleton';
import theme from '../../theme';

const SessionActivityWrapper = styled.div`
  margin-bottom: 20px;
  border: 1px solid ${theme.boxBackgroundColor};
  border-radius: 5px;
  background-color: ${theme.boxBackgroundColor};
  padding: 10px;
  min-height: 131px;
  a {
    display: block;
    width: 100%;
    &:hover {
      text-decoration: none;
    }
  }
  .text {
    font-size: 17px;
    color: ${theme.textColor};
  }
  .date {
    font-style: italic;
    text-align: right;
  }
  .content {
    display: flex;
    align-items: center;
    .author {
      font-weight: 800;
      margin-bottom: 0px;
      text-align: left;
    }
    img {
      border-radius: 100%;
      margin-right: 10px;
    }
  }
`;

export default ({ activity }) => {
  if (activity) {
    return (
      <SessionActivityWrapper>
        <div className='text date'>
          {format(new Date(activity.date), "d 'de' LLLL 'de' yyyy, H:mm", { locale: es })}
        </div>
        <div className='content'>
          <ImageSkeleton className='avatar' url={activity.author.avatar} circle={true} width={65} height={65} />
          <div className='inner-content'>
            <div className='text author'>{activity.author.name}</div>
            <div className='text description'>{activity.body}</div>
          </div>
        </div>
      </SessionActivityWrapper>
    );
  } else {
    return (
      <div style={{marginBottom: '20px'}}>
        <Skeleton height={131} width={'100%'} />
      </div>
    );
  }
};