import React, { Component, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';

import Login from '../components/Auth/Login';
import Profile from '../components/Profile/Profile'
import setAuthToken from '../utils/setAuthToken';
import { AuthActionTypes, checkAuth, logout } from '../actions/authActions';
// import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import { store } from '../store';
import './App.css'

if (localStorage.token) {
    setAuthToken(localStorage.token);
    store.dispatch({
        type: AuthActionTypes.SET_AUTH,
        payload: true
    });
}

store.dispatch(checkAuth());

const App = () => {

    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/login" component={Login} />
                        <PrivateRoute exact path="/profile" redirectPath="/login" component={Profile} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;


