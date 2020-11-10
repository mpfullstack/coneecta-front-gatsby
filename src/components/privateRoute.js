import React from "react"
import { navigate } from "gatsby"
import { isLoggedIn } from '../helpers/authentication';

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/login`) {
    if (typeof(window) === 'object') {
      navigate(`/login${location.search}`);
    }
    return null;
  }
  return <Component {...rest} />
}

export default PrivateRoute;