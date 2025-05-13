const axios = require("axios");

const getWeather = async (req, res) => {
    try {
        const { city } = req.query;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
        const response = await axios.get(apiUrl);

        const weatherData = {
            temperature: Math.round(response.data.main.temp),
            humidity: response.data.main.humidity,
            description: response.data.weather[0].description,
        };

        res.json(weatherData);
    } catch (error) {
        console.log(error);

        if (error.response && error.response.status === 404) {
            return res.status(404).json({
                status: "error",
                message: "City not found",
            });
        }

        res.status(400).json({
            status: "error",
            message: "Invalid request",
        });
    }
};

module.exports = {
    getWeather,
};
