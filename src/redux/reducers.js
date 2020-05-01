import { combineReducers } from 'redux';
import professionalProfileReducer from '../features/professionalProfile/professionalProfileSlice';

export default combineReducers({
  professionalProfile: professionalProfileReducer
});