import React from 'react';
import { Link } from 'gatsby';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { User, Calendar, Wallet, Logout } from './icons';
import MenuIcon from './menuIcon';
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

const UserProfileMenuWrapper = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  right: 0;
  height: 55px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
      padding: 0;
      z-index: 1000;
      -webkit-box-shadow: -3px 3px 5px 0px rgba(51,51,51,0.47);
      -moz-box-shadow: -3px 3px 5px 0px rgba(51,51,51,0.47);
      box-shadow: -3px 3px 5px 0px rgba(51,51,51,0.47);
      left: -5px !important;
      .dropdown-item {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-content: center;
        align-items: center;
        padding: 8px 25px 8px 10px;
        border-bottom: 1px solid ${theme.borderDropdownItemColor};
        &:active,
        &:hover {
          background-color: transparent;
          color: ${theme.textColor};
        }
        &:last-child {
          border-bottom: none;
        }
        .svg-inline--fa {
          margin-right: 10px;
          color: ${theme.iconDropdownItemColor};
          font-size: 20px;
        }

      }
    }
  }
  .fa-user-circle {
    color: ${theme.textColor};
    font-size: 32px;
  }
`;

const MenuItem = ({ to, text, icon }) => {
  return (
    <Link className='dropdown-item' key={to} to={to}>{icon}{text}</Link>
  );
}

const UserProfileMenu = ({ profileDetails, logout }) => {
  const { t } = useTranslation();

  if (isLoggedIn() && profileDetails) {
    return (
      <UserProfileMenuWrapper>
        <Dropdown>
          <Dropdown.Toggle id='user-profile-icon'>
            <MenuIcon />
          </Dropdown.Toggle>
          <Dropdown.Menu rootCloseEvent='click' onClick={() => document.body.click()}>
            <MenuItem
              icon={<User />} to='/profile' text={t('personalData').toUpperCase()} />
            <MenuItem
              icon={<Calendar />} to='/profile/bookings' text={t('bookings').toUpperCase()} />
            <MenuItem
              icon={<Wallet />} to='/profile/wallet' text={t('wallet').toUpperCase()} />
            <Dropdown.Item onClick={() => logout({ redirect: true })}><Logout />{t('logout').toUpperCase()}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </UserProfileMenuWrapper>
    );
  } else {
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileMenu);