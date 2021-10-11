import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Redirect, Route, RouteProps} from 'react-router'
import { RootState } from '../store';

export interface IPrivateRouteProps extends RouteProps {
  isAuth: boolean // is authenticate route
  redirectPath: string // redirect path if don't authenticate route
}

class PrivateRoute extends Component<IPrivateRouteProps> {

    render() {

        return this.props.isAuth ? (
            <Route {...this.props} component={this.props.component} render={undefined} />
          ) : (
            <Redirect to={{pathname: this.props.redirectPath}} />
          )
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        isAuth: state.auth.isAuth
    };
};

export default connect(
    mapStateToProps,
    {}
)(PrivateRoute);