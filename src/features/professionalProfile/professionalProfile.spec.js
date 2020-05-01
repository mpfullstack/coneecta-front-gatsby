import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import api from '../../api';
import ProfessionalProfile from './professionalProfile';
import store from '../../redux/store';

// Mock api call
api.getProfessionalProfile = jest.fn().mockImplementation(() => Promise.resolve({
  details: {
    name: 'Pedro',
    profilePic: '/img/profile1.jpg'
  },
  services: [{
    id: 1,
    name: 'Service I'
  }, {
    id: 2,
    name: 'Service II'
  }]
}));

describe('My Connected React-Redux Component', () => {
  let component;

  beforeEach(() => {
    // Mock current location query string to make ProfessionalProfile work properly
    const location = { search: '?id=1' };
    component = <Provider store={store()}>
      <ProfessionalProfile location={location} />
    </Provider>
  });

  test('Renders professional profile details', async () => {
    const { getByText, findByText } = render(component);

    // It works!
    // await waitFor(() => {
    //   expect(getByText("Name: Luis")).toBeInTheDocument();
    // });

    // It also works!
    expect(await findByText("Name: Pedro")).toBeInTheDocument();

    // It also works!
    expect(await findByText("Service II")).toBeInTheDocument();
  });
});