import { createSlice } from '@reduxjs/toolkit'

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    'status': 'pending',
    'details': null,
    'sessions': null,
    'sessionDetail': null,
    'loadingSessions': true
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
    }
  }
});

export const {
  loadProfile, initProfile, resetProfile,
  loadSessions, initSessions, sessionsLoaded,
  loadSessionDetail, initSessionDetail
} = profileSlice.actions;

export default profileSlice.reducer;