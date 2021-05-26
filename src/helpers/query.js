const queryString = require('query-string');

function getParams(location) {
  return queryString.parse(location.search);
}

function getPath(location) {
  const pathPrefix = process.env.PATH_PREFIX;
  return location.pathname.replace(pathPrefix, "");
}

const Query = {
  getParams,
  getPath
}

export default Query;