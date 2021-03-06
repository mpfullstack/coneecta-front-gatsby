import PureCache from 'pure-cache';
import SuperFetch from '../helpers/superFetch';
import {
  professionalProfileUrl, timeZonesUrl, availableDatesUrl,
  professionalProfileReviewsUrl, loginUrl, signUpUrl, profileUrl,
  reserveUrl, logoutUrl, timeLimitsUrl, sessionsUrl, sessionDetailUrl,
  sessionActionsUrl, saveProfileUrl, countriesUrl, checkoutUrl,
  paymentStatusUrl, walletMovementsUrl, sessionActivitiesUrl,
  requestPasswordResetUrl, passwordResetUrl
} from './urls';

const CACHE_EXPIRATION = 1000 * 60 * 10; // Expires in 10 minutes
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

async function getProfessionalProfileReviews({ id, page = 1 }) {
  const url = professionalProfileReviewsUrl
    .replace(':id', id)
    .replace(':page', page);
  if (!cacheStore.get(url)) {
    cacheStore.put(url, await SuperFetch.get(url), CACHE_EXPIRATION);
  }
  return cacheStore.get(url).value;
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
    const data = await SuperFetch.get(timeLimitsUrl);
    cacheStore.put(key, data, CACHE_EXPIRATION);
  }
  return cacheStore.get(key).value;
}

async function getCountries(data) {
  const key = 'countries';
  if (!cacheStore.get(key)) {
    const data = await SuperFetch.get(countriesUrl);
    cacheStore.put(key, data, 1000 * 60 * 60); // One hour expiration
  }
  return cacheStore.get(key).value;
}

async function getSessions({ page = 1 }) {
  return await SuperFetch.get(sessionsUrl.replace(':page', page));
}

async function getSessionDetail(id) {
  return await SuperFetch.get(sessionDetailUrl.replace(':id', id));
}

async function getSessionActivities({ id, page = 1 }) {
  return await SuperFetch.get(sessionActivitiesUrl
    .replace(':id', id)
    .replace(':page', page)
  );
}

async function performSessionAction({ action, id, data = {} }) {
  return await SuperFetch.post(
    sessionActionsUrl.replace(':action', action),
    {
      id: Number(id),
      ...data
    }
  );
}

async function saveProfile(data) {
  return await SuperFetch.post(saveProfileUrl, data);
}

async function checkout(credits) {
  return await SuperFetch.post(checkoutUrl,
    {
      credits
    }
  );
}

async function getPaymentStatus(id) {
  return await SuperFetch.get(paymentStatusUrl.replace(':id', id));
}

async function getWalletMovements({ page = 1 }) {
  return await SuperFetch.get(walletMovementsUrl.replace(':page', page));
}

async function requestPasswordReset(data) {
  return await SuperFetch.post(requestPasswordResetUrl, data);
}

async function passwordReset(data) {
  return await SuperFetch.post(passwordResetUrl, data);
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
  checkout,
  logout,
  getTimeLimits,
  getSessions,
  getSessionDetail,
  getSessionActivities,
  performSessionAction,
  saveProfile,
  getCountries,
  getPaymentStatus,
  getWalletMovements,
  requestPasswordReset,
  passwordReset
};

export default api;