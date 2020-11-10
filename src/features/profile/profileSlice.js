import { createSlice } from '@reduxjs/toolkit'

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    'status': 'pending',
    'details': null,
    'sessions': null,
    'sessionDetail': null,
    'loadingSessions': false,
    'performingSessionAction': false,
    'formStatus': 'idle',
    'profileErrors': []
	},
  reducers: {
    loadProfile: state => {
      state.status = 'loading';
    },
    initProfile: (state, action) => {
      state.status = 'loaded';
      state.details = action.payload
    },
    resetProfile: state => {
      state.status = 'pending';
      state.details = null;
      state.sessions = null;
      state.sessionDetail = null;
      state.formStatus = 'idle';
    },
    loadSessions: state => {
      state.loadingSessions = true;
    },
    sessionsLoaded: state => {
      state.loadingSessions = false;
    },
    initSessions: (state, action) => {
      state.sessions = action.payload;
    },
    loadSessionDetail: state => {
      state.loadingSessions = true;
    },
    initSessionDetail: (state, action) => {
      state.sessionDetail = action.payload;
    },
    performSessionAction: state => {
      state.performingSessionAction = true;
    },
    saveProfile: state => {
      state.formStatus = 'loading';
    },
    profileUpdated: (state, action) => {
      state.details = action.payload;
      state.formStatus = 'idle';
    },
    saveProfileError: (state, action) => {
      state.formStatus = 'error';
      state.profileErrors = action.payload;
    }
  }
});

export const {
  loadProfile, initProfile, resetProfile,
  loadSessions, initSessions, sessionsLoaded,
  loadSessionDetail, initSessionDetail,
  performSessionAction, saveProfile, profileUpdated,
  saveProfileError
} = profileSlice.actions;

export default profileSlice.reducer;