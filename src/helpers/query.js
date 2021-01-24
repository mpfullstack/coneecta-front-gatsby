const queryString = require('query-string');

function getParams(location) {
  return queryString.parse(location.search);
}

function getPath(location) {
  return location.pathname;
}

const Query = {
  getParams,
  getPath
}

export default Query;