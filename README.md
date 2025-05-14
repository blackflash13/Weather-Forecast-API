# Weather Forecast API

A Node.js application that allows users to subscribe to weather updates for their city. The application uses WeatherAPI.com to fetch weather data and sends email updates to subscribed users.

**Deployed on Vercel:** [https://flash-weather-forecast-api.vercel.app/](https://flash-weather-forecast-api.vercel.app/)


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

## Running with Docker

### Using Docker Compose (Recommended)

This method runs both the application and MongoDB in separate containers:

1. Make sure Docker and Docker Compose are installed on your system
2. Create a `.env` file with your environment variables:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
WEATHER_API_KEY=your-weather-api-key
```

3. Build and start the containers:

```bash
docker-compose up -d
```

4. Access the application at `http://localhost:3000`

### Using Docker Only

If you want to run just the application container:

1. Build the Docker image:

```bash
docker build -t weather-api .
```

2. Run the container:

```bash
docker run -p 3000:3000 --env-file .env weather-api
```

Note: When using Docker only, you'll need to provide a MongoDB connection string to a MongoDB instance in your `.env` file:

```
MONGODB_URI=mongodb://your-mongodb-host:27017/weather-api
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

## Testing

The application includes comprehensive API endpoint tests. To run the tests:

```bash
npm test
```

The tests use Jest as the testing framework and Supertest for API testing. The tests verify:

- Weather API endpoints:
  - Getting weather data for a city
  - Handling missing parameters
  - Handling city not found errors
  - Handling service errors

- Subscription API endpoints:
  - Creating new subscriptions
  - Handling validation errors
  - Confirming subscriptions
  - Unsubscribing from weather updates