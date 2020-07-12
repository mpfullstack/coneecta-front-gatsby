import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import theme from '../../theme';
import TimePicker from './timePicker';
import PrimaryButton from '../buttons/primaryButton';

const TimeZonePickerWrapper = styled.div`
  border: 1px solid ${theme.boxBackgroundColor};
  border-radius: 5px;
  background-color: ${theme.boxBackgroundColor};
  .timezone {
    cursor: pointer;
    height: 120px;
    .item {
      display: block;
      text-align: center;
      color: ${theme.dateTimePickerColor};
    }
    .label {
      padding-top: 8px;
      font-size: 15px;
    }
    .region {
      margin-top: 10px;
      font-weight: bold;
    }
  }
`;

const TimeZoneModalWrapper = styled.div`
  .picker-container {
    .picker-inner {
      .picker-item {
        &:first-child {
          font-size: 20px;
        }
      }
      .picker-buttons {
        right: 7%;
        .previous-button-container {
          top: 35%;
        }
        .next-button-container {
          bottom: 35%;
        }
      }
    }
  }
  .modal-footer {
    background-color: ${theme.boxBackgroundColor};
    border-top: none;
    justify-content: center;
  }
`;

const TimeZonePicker = ({ timezones, selected, onSelectTimeZone, name, gmt }) => {
  const { t } = useTranslation();

  const [show, showModal] = useState(false);
  const [timezoneSelected, selectTimeZone] = useState(selected);

  function handleSelectTimeZone() {
    showModal(false);
    onSelectTimeZone(timezoneSelected);
  }

  return (
    <TimeZonePickerWrapper>
      <div className='timezone' onClick={() => showModal(!show)} role='button' tabIndex={0}
      onKeyDown={() => null}>
        <span className='item label'>{t('Timezone')}</span>
        <span className='item region'>{name}</span>
        <span className='item gmt'>{gmt}</span>
      </div>
      <Modal show={show}>
        <TimeZoneModalWrapper>
          <TimePicker
            valueGroups={{timezones: timezoneSelected }}
            optionGroups={{ timezones: timezones }}
            height={350}
            onSelectTime={({ value }) => selectTimeZone(value)} />
            <Modal.Footer>
              <PrimaryButton onClick={handleSelectTimeZone}>
                {t('Select')}
              </PrimaryButton>
            </Modal.Footer>
        </TimeZoneModalWrapper>
      </Modal>
    </TimeZonePickerWrapper>
  );
}
export default TimeZonePicker;