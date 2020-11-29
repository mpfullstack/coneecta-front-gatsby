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
  }
  .author {
    font-weight: 800;
    margin-bottom: 0px;
    text-align: left;
  }
`;

export default ({ activity }) => {
  if (activity) {
    return (
      <SessionActivityWrapper>
        <div className='text date'>
          {format(new Date(activity.date), "d 'de' LLLL 'de' yyyy · H:mm 'horas'", { locale: es })}
        </div>
        <ImageSkeleton url={activity.author.avatar} circle={true} width={65} height={65} />
        <div className='text author'>{activity.author.name}</div>
        <div className='text description'>{activity.body}</div>
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