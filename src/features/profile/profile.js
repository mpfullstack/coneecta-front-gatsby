import React from 'react';
import { Location } from '@reach/router';
import ProfileLayout from '../../components/profileLayout';
import SEO from "../../components/seo";

const Profile = () => {
  return (
    <Location>
      {props => {
        return (
          <ProfileLayout {...props}>
            <SEO title="Profile" />
            <p>Profile page</p>
          </ProfileLayout>
        );
      }}
    </Location>
  );
}

export default Profile;