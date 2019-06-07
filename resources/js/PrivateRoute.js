import React from "react";
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";

const AuthRoute = ({ component: Component, access_token, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            access_token ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

const mapStateToProps = state => ({
    access_token: state.auth.access_token
});

export default connect(mapStateToProps)(AuthRoute);
