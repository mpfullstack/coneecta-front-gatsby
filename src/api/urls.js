const base = process.env.GATSBY_API_URL;
const professionalsUrl = `${base}/profile`;
const professionalProfileUrl = `${professionalsUrl}?slug=:slug`;
const professionalProfileReviewsUrl = `${base}/reviews?profile=:id`;
const availableDatesUrl = `${base}/availability?timezone=:timezone&service=:serviceId`
const timeZonesUrl = `${base}/timezones`;
const loginUrl = `${base}/login`;
const logoutUrl = `${base}/logout`;
const signUpUrl = `${base}/signup`;
const profileUrl = `${base}/user`;
const reserveUrl = `${base}/reserve`;
const timeLimitsUrl = `${base}/timelimits`

export {
  professionalProfileUrl,
  availableDatesUrl,
  timeZonesUrl,
  professionalProfileReviewsUrl,
  loginUrl,
  signUpUrl,
  profileUrl,
  reserveUrl,
  logoutUrl,
  timeLimitsUrl
};