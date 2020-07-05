import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Dropdown } from 'react-bootstrap';
import { UserCircle } from './icons';
import { logout } from '../features/loginSignUp/loginSignUpSlice';

const mapDispatchToProps = {
  logout
};
const mapStateToProps = state => {
  return {}
}

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
    }
    .dropdown-menu {
      z-index: 1000;
    }
  }
  .fa-user-circle {
    color: #666;
    font-size: 32px;
  }
`;

const userProfileIcon = ({ logout }) => {
  return (
    <UserProfileIconWrapper>
      <Dropdown>
        <Dropdown.Toggle id='user-profile-icon'>
          <UserCircle />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => logout()}>Cerrar sesión</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </UserProfileIconWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(userProfileIcon);