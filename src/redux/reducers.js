import { combineReducers } from 'redux';
import globalSliceReducer from '../features/global/globalSlice';
import professionalProfileReducer from '../features/professionalProfile/professionalProfileSlice';
import profileReducer from '../features/profile/profileSlice';
import bookingReducer from '../features/booking/bookingSlice';
import loginSignUpReducer from '../features/loginSignUp/loginSignUpSlice';
import paymentReducer from '../features/payment/paymentSlice';

export default combineReducers({
  global: globalSliceReducer,
  professionalProfile: professionalProfileReducer,
  profile: profileReducer,
  booking: bookingReducer,
  loginSignUp: loginSignUpReducer,
  payment: paymentReducer
});