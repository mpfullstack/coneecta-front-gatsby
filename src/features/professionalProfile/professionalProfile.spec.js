import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import api from '../../api';
import ProfessionalProfile from './professionalProfile';
import store from '../../redux/store';
import '../../locales/i18n';

// Mock api call
api.getProfessionalProfile = jest.fn().mockImplementation(() => Promise.resolve({
  "id": 1,
  "details": {
    "name": "Isabela Reinket",
    "avatar": "/img/profile1.jpg",
    "rating": 4,
    "country": "de",
    "languages": [
        "es",
        "en",
        "ca"
    ]
  },
  "services": [
    {
      "id": 1,
      "name": "Lectura del tarot",
      "modalities": [
        {
          "id": 1,
          "type": "videoconference",
          "duration": 30,
          "credits": 123,
          "credits_in_euros": "12,30"
        },
        {
          "id": 2,
          "type": "audioconference",
          "duration": 45,
          "credits": 123,
          "credits_in_euros": "12,30"
        },
        {
          "id": 3,
          "type": "onsite",
          "duration": 30,
          "credits": 123,
          "credits_in_euros": "12,30"
        }
      ]
    },
    {
      "id": 2,
      "name": "Psicologia",
      "modalities": [
        {
          "id": 2,
          "type": "audioconference",
          "duration": 45,
          "credits": 123,
          "credits_in_euros": "12,30"
        },
        {
          "id": 3,
          "type": "onsite",
          "duration": 30,
          "credits": 123,
          "credits_in_euros": "12,30"
        }
      ]
    }
  ]
}));

// Mock fetch
global.fetch = jest.fn(() => Promise.resolve());

describe('My Connected React-Redux Component', () => {
  let component;

  beforeEach(() => {
    // Mock current location query string to make ProfessionalProfile work properly
    const location = { pathname: '/u/javimarrero' };
    component = <Provider store={store}>
      <ProfessionalProfile location={location} />
    </Provider>
  });

  test('Renders professional profile details', async () => {
    render(component);

    expect(await screen.findByText("Isabela Reinket")).toBeInTheDocument();

    expect(await screen.findByText("Lectura del tarot")).toBeInTheDocument();
  });

  test('Show professional profile service details on click', async () => {
    render(component);

    expect(await screen.findByText("Lectura del tarot")).toBeInTheDocument();

    fireEvent.click(await screen.findByText("Lectura del tarot"));

    expect(await screen.findByText(/Escoge la modalidad/i)).toBeInTheDocument();
  });

  test('Show date time picker page for selected service modality', async () => {
    render(component);

    fireEvent.click(await screen.findByText("Lectura del tarot"));

    fireEvent.click(await screen.findByText("Video conferencia"));

    await waitFor(() => {
      expect(screen.getByText(/hacer tu reserva/i)).toBeInTheDocument();
      expect(screen.getByText("Reservar")).toBeInTheDocument();
    });
  });
});