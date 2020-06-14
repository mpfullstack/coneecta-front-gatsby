import { combineReducers } from 'redux';
import globalSliceReducer from '../features/global/globalSlice';
import professionalProfileReducer from '../features/professionalProfile/professionalProfileSlice';
import bookingReducer from '../features/booking/bookingSlice';
import loginSignUpReducer from '../features/loginSignUp/loginSignUpSlice';

export default combineReducers({
  global: globalSliceReducer,
  professionalProfile: professionalProfileReducer,
  booking: bookingReducer,
  loginSignUp: loginSignUpReducer
});