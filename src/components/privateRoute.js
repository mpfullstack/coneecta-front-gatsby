import React from "react"
import { navigate } from "gatsby"

function isLoggedIn() {
  return true;
}

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/profile/login`) {
    if (typeof(window) === 'object') {
      navigate("/profile/login");
    }
    return null;
  }
  return <Component {...rest} />
}

export default PrivateRoute;