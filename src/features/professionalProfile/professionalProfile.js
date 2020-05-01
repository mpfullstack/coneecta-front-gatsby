import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadProfile } from './professionalProfileSlice';

const mapDispatchToProps = { loadProfile };
const mapStateToProps = state => {
  return {
    profile: state.professionalProfile
  }
}

export const ProfessionalProfile = ({ profile, loadProfile, ...rest }) => {
  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  debugger;

  if (profile.details) {
    return (
      <div>
        <p>Name: {profile.details.name}</p>
        <ul>
          {
            profile.services.map(service => {
              return <li key={service.id}>{service.name}</li>;
            })
          }
        </ul>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalProfile);