const customHeader = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json'
});

const handleFetchResponse = (response, customHandle) => {
  if (customHandle) {
    let result = customHandle(response);
    if (result) {
      return result;
    }
  }
  if (Number(response.status) >= 400) {
    return new Promise((resolve, reject) => {
      resolve(response.json());
    })
    .then(({ code }) => {
      return {
        status: response.status,
        error: {
          code
        }
      };
    })
    .catch(error => {
      return {
        status: response.status,
        error: {
          code: 'unexpectedError'
        }
      };
    });
  }

  return response.json();
}

const base = (method, url, data, customHandle, customOptions) => {
  let options = {
    method: String(method).toUpperCase(),
    headers: customHeader()
  };

  // if( siteConfig.authMechanism === authentication.JWT || siteConfig.authMechanism === authentication.AUTH0 ) {
  //   if( sessionStorage.getItem('idToken') )
  //   options.headers.Authorization = `JWT ${sessionStorage.getItem('idToken')}`;
  // }

  // if (siteConfig.authMechanism === authentication.COOKIE) {
  //   options.credentials = 'same-origin';
  // }

  // Set body request
  if (data) {
    options.body =  JSON.stringify(data);
  }

  if( String(method).toUpperCase() === 'PATCH' && !options.body) {
    options.body = '{}';
  }

  // const csrftoken = Cookies.get('csrftoken');
  // if( (method === "post" || method === "put" || method === "patch") && csrftoken )
  //   options.headers["X-CSRFToken"] = csrftoken;

  if( customOptions ) {
    options = {
      ...options,
      ...customOptions
    };
  }

  return fetch(`${url}`, options)
    .then(response => {
      return handleFetchResponse(response, customHandle);
    })
    .catch(error => {
      return {
        status: error.status,
        error: {
          name: 'unexpectedError',
          description: error
        }
      };
    })
};

const SuperFetch = {};

['get', 'post', 'put', 'patch', 'delete'].forEach(method => {
  SuperFetch[method] = base.bind(null, method);
});

export default SuperFetch;