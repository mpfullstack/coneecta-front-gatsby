import React from 'react';
import { Provider } from 'react-redux';
import { Router } from "@reach/router";
import store from '../redux/store';
import Profile from '../features/profile';
import PaymentConfirmed from '../features/profile/paymentConfirmed';
import PrivateRoute from '../components/privateRoute';
import Login from './login';
import Layout from "../components/layout"

export default () => {
  return (
    <Provider store={store}>
      <Layout>
        <Router basepath="/profile">
          <PrivateRoute path="/" component={Profile} />
          <PrivateRoute path="/payment_confirmed/:id" component={PaymentConfirmed} />
          <Login path="/login" />
        </Router>
      </Layout>
    </Provider>
  );
};