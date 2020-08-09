import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateAdminRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true && auth.users.role === "admin"? (
        <Component {...props} />
      ) : (
        <Redirect to="/loginFirst" />
      )
    }
    // {...console.log(auth)}
  />
);

PrivateAdminRoute.protoTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateAdminRoute);
