import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { userInfo } from "os";

const AdminPrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user.isAuthenticated === true && user.user.isAdmin ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

AdminPrivateRoute.propTypes = {
  user: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(AdminPrivateRoute);
