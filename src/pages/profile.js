import React from 'react';
import { Provider } from 'react-redux';
import { Router, Redirect } from "@reach/router";
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../redux/store';
import Profile from '../features/profile';
import PaymentConfirmed from '../features/profile/paymentConfirmed';
import Payment from '../features/profile/payment';
import PrivateRoute from '../components/privateRoute';
import Layout from "../components/layout"

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Router basepath={`${process.env.PATH_PREFIX}/profile`}>
            <PrivateRoute path="/" component={Profile} />
            <PrivateRoute path="/payment" component={Payment} />
            <PrivateRoute path="/payment_confirmed/:id" component={PaymentConfirmed} />
          </Router>
        </Layout>
      </PersistGate>
    </Provider>
  );
};
