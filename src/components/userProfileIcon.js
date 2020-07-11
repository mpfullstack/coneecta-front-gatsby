import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { UserCircle } from './icons';
import theme from '../theme';
import { isLoggedIn } from '../helpers/authentication';
import { logout } from '../features/loginSignUp/loginSignUpSlice';

const mapDispatchToProps = {
  logout
};

const mapStateToProps = ({ profile }) => {
  const profileDetails = profile.details || null;
  return {
    profileDetails
  }
};

const UserProfileIconWrapper = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  right: 0;
  .dropdown {
    .dropdown-toggle {
      background-color: transparent;
      border-color: transparent;
      &::after {
        display: none;
      }
      &.btn-primary:not(:disabled):not(.disabled).active,
      &.btn-primary:not(:disabled):not(.disabled):active {
        background-color: transparent;
        border-color: transparent;
      }
      &.btn-primary:not(:disabled):not(.disabled).active:focus,
      &.btn-primary:not(:disabled):not(.disabled):active:focus
      &:focus,
      &.btn-primary:focus {
        box-shadow: none;
      }
    }
    .dropdown-menu {
      z-index: 1000;
    }
  }
  .fa-user-circle {
    color: ${theme.textColor};
    font-size: 32px;
  }
`;

const UserProfileIcon = ({ profileDetails, logout }) => {
  const { t } = useTranslation();

  if (isLoggedIn() && profileDetails) {
    return (
      <UserProfileIconWrapper>
        <Dropdown>
          <Dropdown.Toggle id='user-profile-icon'>
            <UserCircle />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={logout}>{t('logout').toUpperCase()}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </UserProfileIconWrapper>
    );
  } else {
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileIcon);