import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadProfile } from './professionalProfileSlice';
import Query from '../../helpers/query';
import Skeleton from 'react-loading-skeleton';
import ImageSkeleton from '../../components/imageSkeleton';

// https://github.com/buildo/react-placeholder
// https://github.com/dvtng/react-loading-skeleton

const mapDispatchToProps = { loadProfile };
const mapStateToProps = state => {
  return {
    profile: state.professionalProfile
  }
}

export const ProfessionalProfile = ({ profile, loadProfile, location }) => {
  useEffect(() => {
    const params = Query.getParams(location);
    if (params.id) {
      loadProfile(params.id);
    }
  }, [loadProfile, location]);

  const profileDetails = profile.details || {};
  const profileServices = profile.services.length ? profile.services : null;

  return (
    <div>
      <ImageSkeleton url={profileDetails.profilePic} circle={true} width={124} height={124} />
      <p>Name: {profileDetails.name || <Skeleton width={200} />}</p>
      <ul>
        {
          profileServices ?
            profileServices.map(service => {
              return <li key={service.id}>{service.name}</li>;
            })
            :
            <Skeleton height={24} count={3} />
        }
      </ul>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalProfile);