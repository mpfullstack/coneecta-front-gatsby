import React from 'react';
import { Provider } from 'react-redux';
import { Router } from "@reach/router";
import store from '../redux/store';
import Profile from '../features/profile';
import PrivateRoute from '../components/privateRoute';
import Login from './login';

export default () => {
  return (
    <Provider store={store()}>
      <h1>Redux Toolkit Tutorial</h1>
      <Router basepath="/profile">
        <PrivateRoute path="/" component={Profile} />
        <Login path="/login" />
      </Router>
    </Provider>
  );
};