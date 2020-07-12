import PureCache from 'pure-cache';
import SuperFetch from '../helpers/superFetch';
import {
  professionalProfileUrl, timeZonesUrl, availableDatesUrl, professionalProfileReviewsUrl,
  loginUrl, signUpUrl, profileUrl, reserveUrl, logoutUrl, timeLimitsUrl
} from './urls';

const cacheStore = new PureCache({ expiryCheckInterval: 500 });

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

async function getTimeLimits(data) {
  const key = 'timelimits';
  if (!cacheStore.get(key)) {
    cacheStore.put(key, await SuperFetch.get(timeLimitsUrl), 1000 * 60 * 10); // Expires in 10 minuts
  }
  return cacheStore.get(key).value;
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
  logout,
  getTimeLimits
};

export default api;