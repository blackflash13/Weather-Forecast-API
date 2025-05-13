const { getWeatherForCity } = require("../services/weatherService");

const getWeather = async (req, res) => {
    try {
        const { city } = req.query;

        const weatherData = await getWeatherForCity(city);

        res.json(weatherData);
    } catch (error) {
        console.log(error);

        if (error.status === 404) {
            return res.status(404).json({
                status: "error",
                message: "City not found",
                error: error.message,
            });
        }

        res.status(500).json({
            status: "error",
            message: "Invalid request",
        });
    }
};

module.exports = {
    getWeather,
};
