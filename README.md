# Weather Forecast API

A Node.js application that allows users to subscribe to weather updates for their city. The application uses WeatherAPI.com to fetch weather data and sends email updates to subscribed users.

## Features

- Get current weather for any city
- Subscribe to weather updates with email notifications
- Choose between hourly or daily updates
- Email confirmation for subscriptions
- Easy unsubscribe functionality
- Swagger API documentation

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- WeatherAPI.com API key
- Gmail account for sending emails

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd weather-forecast-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/weather-api
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
WEATHER_API_KEY=your-weather-api-key
```

4. Start the application:

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Documentation

Once the application is running, you can access the Swagger documentation at:

```
http://localhost:3000/api-docs
```

## API Endpoints

### Weather

- `GET /api/weather?city=<city_name>` - Get current weather for a city

### Subscription

- `POST /api/subscribe` - Subscribe to weather updates
- `GET /api/confirm/:token` - Confirm email subscription
- `GET /api/unsubscribe/:token` - Unsubscribe from weather updates

## Environment Variables

- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `EMAIL_USER` - Gmail address for sending emails
- `EMAIL_PASS` - Gmail app-specific password
- `WEATHER_API_KEY` - WeatherAPI.com API key
