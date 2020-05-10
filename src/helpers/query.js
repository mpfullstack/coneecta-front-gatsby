const queryString = require('query-string');

function getParams(location) {
  return queryString.parse(location.search);
}

const Query = {
  getParams
}

export default Query;