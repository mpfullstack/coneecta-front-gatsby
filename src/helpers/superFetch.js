const customHeader = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json'
});

const base = (method, url, data) => {
  const options = {
    method,
    headers: customHeader()
  };
  if (data) {
    options.body =  JSON.stringify(data);
  }

  return fetch(`${url}`, options)
    .then(response => response.json())
    .then(res => res)
    .catch(error => ({ error: error }));
};

const SuperFetch = {};

['get', 'post', 'put', 'delete'].forEach(method => {
  SuperFetch[method] = base.bind(null, method);
});

export default SuperFetch;