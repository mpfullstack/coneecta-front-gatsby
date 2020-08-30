import React from 'react';
import { Location } from '@reach/router';
import ProfileLayout from '../../components/profileLayout';
import BookingList from './bookingList';
import BookingDetail from './bookingDetail';

const ProfileBookings = ({ id, action }) => {
  return (
    <Location>
      {props => {
        return (
          <ProfileLayout {...props}>
            {id ?
              <BookingDetail id={id} action={action} />
              :
              <BookingList />
            }
          </ProfileLayout>
        );
      }}
    </Location>
  );
}

export default ProfileBookings;