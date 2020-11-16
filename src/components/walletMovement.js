import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Skeleton from './skeleton';
import theme from '../theme';
import { useTranslation } from 'react-i18next';
import { Modality } from './services/serviceModalities';

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
  .name {
    font-weight: 800;
  }
  .modality {
    margin: 5px 0 0 0;
    cursor: pointer;
    .modality-item {
      white-space: nowrap;
      text-align: right;
      padding: 5px 0;
      &:first-child {
        text-align: left;
      }
    }
  }
`;

const WalletMovement = ({ movement = null }) => {
  const { t } = useTranslation();

  if (movement) {
    return (
      <WalletMovementWrapper>
        <div className='text date'>
          {format(new Date(movement.date), "d 'de' LLLL 'de' yyyy · H:mm 'horas'", { locale: es })}
        </div>
        <div className='text name'>{movement.name}</div>
        <div className='text teacher'>{movement.teacher}</div>
        <Modality modality={movement.modality} onClick={() => null} />
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