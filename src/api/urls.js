const base = process.env.GATSBY_API_URL;
const professionalsUrl = `${base}/profile`;
const professionalProfileUrl = `${professionalsUrl}?slug=:id`;

export {
  professionalProfileUrl
};