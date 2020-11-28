import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Skeleton from '../../components/skeleton';
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
  .movement-title {
    font-weight: 800;
    margin-bottom: 0px;
    text-align: left;
  }
  .credits {
    font-weight: 800;
  }
`;

export default ({ activity }) => {
  if (activity) {
    return (
      // <WalletMovementWrapper>
      //   <div className='text movement-title'>{movement.title}</div>
      //   <div className='text description'>{movement.description}</div>
      //   <div className='text date'>
      //     {format(new Date(movement.date), "d 'de' LLLL 'de' yyyy · H:mm 'horas'", { locale: es })}
      //   </div>
      //   <div className='credits'>{`${Math.abs(movement.credits)} créditos`}</div>
      // </WalletMovementWrapper>
      <SessionActivityWrapper>
        <div className='text date'>
          {format(new Date(activity.date), "d 'de' LLLL 'de' yyyy · H:mm 'horas'", { locale: es })}
        </div>
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