import { createSlice } from '@reduxjs/toolkit'

const professionalProfileSlice = createSlice({
  name: 'professionalProfile',
  initialState: {
    'id': null,
    'collapseProfileHeader': false,
		'details': null,
    'services': [],
    'reviews': null, // Professional profile reviews
    'showedServiceId': null, // It indicates which service to show in list of services
    'section': 'serviceList' // serviceList, datePicker
	},
  reducers: {
    loadProfile: state => state,
    initProfile: (state, action) => {
      state.id = action.payload.id;
      state.details = action.payload.details;
      state.services = action.payload.services;
      // state.reviews = action.payload.reviews;
      // NOTE: Temp fix
      state.reviews = [
        {
          "name": "Jhon Doe",
          "date": "26/01/2020",
          "rating": 3,
          "comments": "Pellentesque consequat, nulla a feugiat ultrices, metus urna venenatis lectus, eget efficitur dolor quam vitae elit."
        },
        {
          "name": "Jhon Doe",
          "date": "26/01/2020",
          "rating": 3,
          "comments": "Pellentesque consequat, nulla a feugiat ultrices, metus urna venenatis lectus, eget efficitur dolor quam vitae elit."
        },
        {
          "name": "Jhon Doe",
          "date": "26/01/2020",
          "rating": 3,
          "comments": "Pellentesque consequat, nulla a feugiat ultrices, metus urna venenatis lectus, eget efficitur dolor quam vitae elit."
        },
        {
          "name": "Jhon Doe",
          "date": "26/01/2020",
          "rating": 3,
          "comments": "Pellentesque consequat, nulla a feugiat ultrices, metus urna venenatis lectus, eget efficitur dolor quam vitae elit."
        },
        {
          "name": "Jhon Doe",
          "date": "26/01/2020",
          "rating": 3,
          "comments": "Pellentesque consequat, nulla a feugiat ultrices, metus urna venenatis lectus, eget efficitur dolor quam vitae elit."
        },
        {
          "name": "Jhon Doe",
          "date": "26/01/2020",
          "rating": 3,
          "comments": "Pellentesque consequat, nulla a feugiat ultrices, metus urna venenatis lectus, eget efficitur dolor quam vitae elit."
        }
      ]
    },
    collapseProfileHeader: (state, action) => {
      state.collapseProfileHeader = action.payload;
    },
    showService: (state, action) => {
      state.showedServiceId = action.payload;
    },
    changeSection: (state, action) => {
      state.section = action.payload;
    }
  }
});

export const {
  loadProfile,
  initProfile,
  collapseProfileHeader,
  showService,
  changeSection
} = professionalProfileSlice.actions

export default professionalProfileSlice.reducer;