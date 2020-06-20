import React from "react"
import { navigate } from "gatsby"

function isLoggedIn() {
  return true;
}

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/login`) {
    if (typeof(window) === 'object') {
      navigate("/login");
    }
    return null;
  }
  return <Component {...rest} />
}

export default PrivateRoute;