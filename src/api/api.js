import SuperFetch from '../helpers/superFetch';
import {
  professionalProfileUrl, timeZonesUrl, availableDatesUrl
} from './urls';

async function getProfessionalProfile(id) {
  return await SuperFetch.get(professionalProfileUrl.replace(':id', id));
};

async function getAvailableTimezones() {
  return await SuperFetch.get(timeZonesUrl);
}

async function getAvailableDates({ timezone, serviceId }) {
  return await SuperFetch.get(availableDatesUrl
    .replace(':timezone', timezone)
    .replace(':serviceId', serviceId));
}

// TODO: No necessary anymore
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
  getAvailableTimezones,
  getAvailableDates,
  getAvailableTimes
};

export default api;