const base = process.env.GATSBY_API_URL;
const professionalsUrl = `${base}/profile`;
const professionalProfileUrl = `${professionalsUrl}?slug=:slug`;
const professionalProfileReviewsUrl = `${base}/reviews?profile=:id&page=:page`;
const availableDatesUrl = `${base}/availability?timezone=:timezone&service=:serviceId`
const timeZonesUrl = `${base}/timezones`;
const loginUrl = `${base}/login`;
const logoutUrl = `${base}/logout`;
const signUpUrl = `${base}/signup`;
const profileUrl = `${base}/user`;
const reserveUrl = `${base}/reserve`;
const checkoutUrl = `${base}/payment/checkout`;
const paymentStatusUrl = `${base}/payment/status?id=:id`;
const timeLimitsUrl = `${base}/timelimits`;
const sessionsUrl = `${base}/sessions?page=:page`;
const sessionDetailUrl = `${base}/sessions/detail?id=:id`;
const sessionActivitiesUrl = `${base}/activities?id=:id&page=:page`;
const sessionActionsUrl = `${base}/sessions/:action`;
const walletMovementsUrl = `${base}/movements?page=:page`;
const saveProfileUrl = `${profileUrl}/update`;
const countriesUrl = `${base}/countries`;

export {
  professionalProfileUrl,
  availableDatesUrl,
  timeZonesUrl,
  professionalProfileReviewsUrl,
  loginUrl,
  signUpUrl,
  profileUrl,
  saveProfileUrl,
  reserveUrl,
  checkoutUrl,
  paymentStatusUrl,
  logoutUrl,
  timeLimitsUrl,
  sessionsUrl,
  sessionDetailUrl,
  sessionActivitiesUrl,
  sessionActionsUrl,
  countriesUrl,
  walletMovementsUrl
};