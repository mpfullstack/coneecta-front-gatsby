import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Skeleton from './skeleton';
import theme from '../theme';
// import { useTranslation } from 'react-i18next';

const WalletMovementWrapper = styled.div`
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

const WalletMovement = ({ movement = null }) => {
  // const { t } = useTranslation();

  if (movement) {
    return (
      <WalletMovementWrapper>
        <div className='text movement-title'>{movement.title}</div>
        <div className='text description'>{movement.description}</div>
        <div className='text date'>
          {format(new Date(movement.date), "d 'de' LLLL 'de' yyyy · H:mm 'horas'", { locale: es })}
        </div>
        <div className='credits'>{`${Math.abs(movement.credits)} créditos`}</div>
      </WalletMovementWrapper>
    );
  } else {
    return (
      <div style={{marginBottom: '20px'}}>
        <Skeleton height={131} width={'100%'} />
      </div>
    );
  }
}

export default WalletMovement;