import styled from 'styled-components';
import theme from '../../theme';

export default styled.div`
  .card {
    cursor: pointer;
    margin: 10px 0 10px;
    border: none;
    .card-header {
      padding: 5px;
      background-color: ${theme.backgroundServiceCardHeaderColor};
      color: ${theme.textServiceCardHeaderColor};
      .card-title {
        text-align: center;
        font-size: 18px;
        margin-bottom: 0;
        font-weight: 700;
      }
      .fa-edit {
        position: absolute;
        top: 7px;
        right: 6px;
        color: ${theme.iconColor};
      }
    }
    .card-body {
      padding: 5px 10px;
      font-size: 16px;
      border: 1px solid ${theme.borderCardColor};
      border-radius: 0 0 5px 5px;
      .modality-item {
        white-space: nowrap;
        text-align: right;
        padding: 5px 15px;
        &:first-child {
          text-align: left;
        }
      }
    }
  }
`;