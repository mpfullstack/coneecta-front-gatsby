import React from 'react';
import { Provider } from 'react-redux';
import { Router } from "@reach/router";
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../redux/store';
import Profile from '../features/profile';
import Wallet from '../features/profile/wallet';
import ProfileBookings from '../features/profile/profileBookings';
import PaymentConfirmed from '../features/payment/paymentConfirmed';
import PaymentError from '../features/payment/paymentError';
import Payment from '../features/payment';
import PaymentCheckout from '../features/payment/paymentCheckout';
import PrivateRoute from '../components/privateRoute';
import Layout from '../components/layout';
import RechargeWallet from '../features/profile/rechargeWallet';

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Router basepath={`${process.env.PATH_PREFIX}/profile`}>
            <PrivateRoute path="/" component={Profile} />
            <PrivateRoute path="/bookings" component={ProfileBookings} />
            <PrivateRoute path="/bookings/:id" component={ProfileBookings} />
            <PrivateRoute path="/bookings/:id/:action" component={ProfileBookings} />
            <PrivateRoute path="/payment" component={Payment} />
            <PrivateRoute path="/payment_checkout" component={PaymentCheckout} />
            <PrivateRoute path="/payment_ok/:id" component={PaymentConfirmed} />
            <PrivateRoute path="/payment_ok" component={PaymentConfirmed} />
            <PrivateRoute path="/payment_ko/:id" component={PaymentError} />
            <PrivateRoute path="/payment_ko" component={PaymentError} />
            <PrivateRoute path="/wallet" component={Wallet} />
            <PrivateRoute path="/wallet/recharge" component={RechargeWallet} />
          </Router>
        </Layout>
      </PersistGate>
    </Provider>
  );
};
