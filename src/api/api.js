import SuperFetch from '../helpers/superFetch';
import {
  professionalProfileUrl, timeZonesUrl, availableDatesUrl, professionalProfileReviewsUrl,
  loginUrl, signUpUrl, profileUrl, reserveUrl, logoutUrl
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

async function logout() {
  return await SuperFetch.post(logoutUrl);
};

async function signUp(data) {
  return await SuperFetch.post(signUpUrl, data);
};

async function getProfile() {
  return await SuperFetch.get(profileUrl);
}

async function reserve(data) {
  return await SuperFetch.post(reserveUrl, data);
}

const api = {
  getProfessionalProfile,
  getAvailableTimezones,
  getAvailableDates,
  getProfessionalProfileReviews,
  login,
  signUp,
  getProfile,
  reserve,
  logout
};

export default api;