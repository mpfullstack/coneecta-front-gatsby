import SuperFetch from '../helpers/superFetch';
import {
  professionalProfileUrl
} from './urls';

async function getProfessionalProfile(id) {
  return await SuperFetch.get(professionalProfileUrl.replace(':id', id))
    .then(response => {
      if( response.status >= 400 ) {
        // Handle type of error and translate message to spanish
        // response.message = t(response.message, {}, 'Unexpected error');
      }
      return response;
    });
};

const api = {
  getProfessionalProfile
};

export default api;