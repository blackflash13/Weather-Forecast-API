const express = require("express");
const router = express.Router();
const { getWeather } = require("../controllers/weatherController");
const { validateWeatherQuery } = require("../middleware/validation");

/**
 * @swagger
 * /api/weather:
 *   get:
 *     tags:
 *       - weather
 *     summary: Get current weather for a city
 *     description: Returns the current weather forecast for the specified city using WeatherAPI.com.
 *     parameters:
 *       - name: city
 *         in: query
 *         description: City name for weather forecast
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful operation - current weather forecast returned
 *         schema:
 *           type: object
 *           properties:
 *             temperature:
 *               type: number
 *               description: Current temperature
 *             humidity:
 *               type: number
 *               description: Current humidity percentage
 *             description:
 *               type: string
 *               description: Weather description
 *       400:
 *         description: Invalid request
 *       404:
 *         description: City not found
 */

router.get("/", validateWeatherQuery, getWeather);

module.exports = router;
