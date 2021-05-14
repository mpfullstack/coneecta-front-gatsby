import React from "react"
import { navigate } from "gatsby"
import { isLoggedIn } from '../helpers/authentication';
import Query from "../helpers/query";

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/login`) {
    if (typeof(window) === 'object') {
      let parameters = [];
      if (location.search) {
        parameters = [location.search.replace(/^\?+/gmi,"")];
      }
      parameters.push(`r=${encodeURIComponent(Query.getPath(location))}`);
      navigate(`/login?${parameters.join("&")}`);
    }
    return null;
  }
  return <Component {...rest} />
}

export default PrivateRoute;