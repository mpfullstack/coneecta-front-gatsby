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

async function getAvailableDates({ serviceId, modalityType}) {
  // TODO: Implment call to API
  // return await SuperFetch.get(professionalProfileUrl.replace(':id', id))
  //   .then(response => {
  //     if( response.status >= 400 ) {
  //       // Handle type of error and translate message to spanish
  //       // response.message = t(response.message, {}, 'Unexpected error');
  //     }
  //     return response;
  //   });
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve([]), 300);
  });
}

async function getAvailableTimes({ date }) {
  // TODO: Implment call to API
  // return await SuperFetch.get(professionalProfileUrl.replace(':id', id))
  //   .then(response => {
  //     if( response.status >= 400 ) {
  //       // Handle type of error and translate message to spanish
  //       // response.message = t(response.message, {}, 'Unexpected error');
  //     }
  //     return response;
  //   });
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve([]), 350);
  });
}

const api = {
  getProfessionalProfile,
  getAvailableDates,
  getAvailableTimes
};

export default api;