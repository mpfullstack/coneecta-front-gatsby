import React from "react"
import { navigate } from "gatsby"

function isLoggedIn() {
  return false;
}

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/profile/login`) {
    navigate("/profile/login")
    return null;
  }
  return <Component {...rest} />
}

export default PrivateRoute;