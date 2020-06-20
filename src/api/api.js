import SuperFetch from '../helpers/superFetch';
import {
  professionalProfileUrl, timeZonesUrl, availableDatesUrl, professionalProfileReviewsUrl,
  loginUrl, signUpUrl
  //  profileUrl
} from './urls';

async function getProfessionalProfile(slug) {
  return await SuperFetch.get(professionalProfileUrl.replace(':slug', slug));
};

async function getAvailableTimezones() {
  return await SuperFetch.get(timeZonesUrl);
}

async function getAvailableDates({ timezone, serviceId }) {
  return await SuperFetch.get(availableDatesUrl
    .replace(':timezone', timezone)
    .replace(':serviceId', serviceId));
}

async function getProfessionalProfileReviews(id) {
  return await SuperFetch.get(professionalProfileReviewsUrl.replace(':id', id));
};

async function login(data) {
  return await SuperFetch.post(loginUrl, data);
};

async function signUp(data) {
  return await SuperFetch.post(signUpUrl, data);
};

async function getProfile() {
  // TODO: Faking profile
  return {details: null};
  // return {
  //   details: {
  //     "name": "Marc",
  //     "email": "markkus.80@gmail.com",
  //     "timezone": "Europe/Madrid",
  //     "newsletter_subscriber": false,
  //     "role": "client",
  //     "enabled": 1,
  //     "preferred_language": "es",
  //     "created": "2020-06-13T18:11:39+0000",
  //     "modified": "2020-06-13T18:11:39+0000",
  //     "id": 911
  //   }
  // };
  // return await SuperFetch.post(profileUrl, { details: data });
}

const api = {
  getProfessionalProfile,
  getAvailableTimezones,
  getAvailableDates,
  getProfessionalProfileReviews,
  login,
  signUp,
  getProfile
};

export default api;