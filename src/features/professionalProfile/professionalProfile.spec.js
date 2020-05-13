import React from 'react';
import { Provider } from 'react-redux';
import { render, waitFor, fireEvent } from '@testing-library/react';
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
    }
  ]
}));

describe('My Connected React-Redux Component', () => {
  let component;

  beforeEach(() => {
    // Mock current location query string to make ProfessionalProfile work properly
    const location = { search: '?id=1' };
    component = <Provider store={store}>
      <ProfessionalProfile location={location} />
    </Provider>
  });

  test('Renders professional profile details', async () => {
    const { getByText, findByText } = render(component);

    expect(await findByText("Isabela Reinket")).toBeInTheDocument();
    expect(await findByText("Lectura del tarot")).toBeInTheDocument();
  });

  test('Show professional profile service details on click', async () => {
    const { getByText } = render(component);

    fireEvent.click(getByText("Lectura del tarot"));
    expect(getByText("Escoge la modalidad que prefieras")).toBeInTheDocument();
  });

  test('Show date time picker page for selected service modality', async () => {
    const { getByText } = render(component);

    fireEvent.click(getByText("Video conferencia"));

    await waitFor(() => {
      expect(getByText("¿Para cuando quieres hacer tu reserva?")).toBeInTheDocument();
      expect(getByText("Reservar")).toBeInTheDocument();
    });
  });
});