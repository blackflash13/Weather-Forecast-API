const axios = require("axios");

/**
 * Get weather data for a specific city
 * @param {string} city - City name to get weather for
 * @returns {Promise<Object>} - Weather data object
 */
const getWeatherForCity = async (city) => {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
        const response = await axios.get(apiUrl);

        return {
            temperature: Math.round(response.data.main.temp),
            humidity: response.data.main.humidity,
            description: response.data.weather[0].description,
        };
    } catch (error) {
        if (error.response && error.response.status === 404) {
            const notFoundError = {
                status: 404,
                message: "City not found",
            };
            throw notFoundError;
        }
        throw error;
    }
};

module.exports = {
    getWeatherForCity,
};
