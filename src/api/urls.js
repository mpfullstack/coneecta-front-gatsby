const base = process.env.GATSBY_API_URL;
const professionalsUrl = `${base}/profile`;
const professionalProfileUrl = `${professionalsUrl}?slug=:slug`;
const professionalProfileReviewsUrl = `${base}/reviews?profile=:id`;
const availableDatesUrl = `${base}/availability?timezone=:timezone&service=:serviceId`
const timeZonesUrl = `${base}/timezones`;

export {
  professionalProfileUrl,
  availableDatesUrl,
  timeZonesUrl,
  professionalProfileReviewsUrl
};