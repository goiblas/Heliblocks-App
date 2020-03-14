import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loading from "../loading";

export const AuthRoute = ({ component: Component, auth, ...rest }) => {
  const { isLoaded, uid } = auth;

  if (!isLoaded) {
    return <Loading />;
  }
  if (!uid) {
    return <Redirect to="/" />;
  }
  return <Route {...rest} component={Component} />;
};

AuthRoute.prototype = {
  auth: PropTypes.object.isRequired,
  component: PropTypes.elementType
};

const mapStateToProps = state => ({
  auth: state.firebase.auth
});
export default connect(mapStateToProps)(AuthRoute);
