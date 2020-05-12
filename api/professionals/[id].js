module.exports = (req, res) => {
  res.json({
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
        "name": "Sesion personalizada",
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
        "id": 3,
        "name": "Analisis astrologico",
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
  })
}