const base = process.env.GATSBY_API_URL;
const professionalsUrl = `${base}/professionals`;
const professionalProfileUrl = `${professionalsUrl}/:id`;

export {
  professionalProfileUrl
};