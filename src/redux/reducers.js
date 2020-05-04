import { combineReducers } from 'redux';
import globalSliceReducer from '../features/global/globalSlice';
import professionalProfileReducer from '../features/professionalProfile/professionalProfileSlice';

export default combineReducers({
  global: globalSliceReducer,
  professionalProfile: professionalProfileReducer
});