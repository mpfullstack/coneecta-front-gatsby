import React from 'react';
import { Location } from '@reach/router';
import { Row, Col } from 'react-bootstrap';
import SEO from "../../components/seo";
import ProfileLayout from '../../components/profileLayout';
import UserForm from './userForm';

const Profile = ({ id }) => {
  return (
    <Location>
      {props => {
        return (
          <ProfileLayout {...props}>
            <SEO title="Datos personales" />
            <h1 className='title'>Datos personales</h1>
            <Row className={`justify-content-md-center`}>
              <Col xs='12' md='10'>
                <UserForm />
              </Col>
            </Row>
          </ProfileLayout>
        );
      }}
    </Location>
  );
}

export default Profile;