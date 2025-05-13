const request = require("supertest");
const app = require("../../src/app");
const weatherService = require("../../src/services/weatherService");

jest.mock("../../src/services/weatherService");

describe("Weather API Endpoints", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/weather", () => {
        it("should return 400 if city parameter is missing", async () => {
            const response = await request(app)
                .get("/api/weather")
                .expect("Content-Type", /json/)
                .expect(400);

            expect(response.body).toHaveProperty("status", "error");
            expect(response.body).toHaveProperty("message");
        });

        it("should return weather data for a valid city", async () => {
            weatherService.getWeatherForCity.mockResolvedValue({
                temperature: 20,
                humidity: 65,
                description: "Sunny",
            });

            const response = await request(app)
                .get("/api/weather")
                .query({ city: "London" })
                .expect("Content-Type", /json/)
                .expect(200);

            expect(weatherService.getWeatherForCity).toHaveBeenCalledWith(
                "London",
            );
            expect(response.body).toHaveProperty("temperature", 20);
            expect(response.body).toHaveProperty("humidity", 65);
            expect(response.body).toHaveProperty("description", "Sunny");
        });

        it("should return 404 when city is not found", async () => {
            weatherService.getWeatherForCity.mockRejectedValue({
                status: 404,
                message: "City not found",
            });

            const response = await request(app)
                .get("/api/weather")
                .query({ city: "NonExistentCity" })
                .expect("Content-Type", /json/)
                .expect(404);

            expect(response.body).toHaveProperty("error");
        });

        it("should handle service errors properly", async () => {
            weatherService.getWeatherForCity.mockRejectedValue(
                new Error("Service unavailable"),
            );

            const response = await request(app)
                .get("/api/weather")
                .query({ city: "London" })
                .expect("Content-Type", /json/)
                .expect(500);

            expect(response.body).toHaveProperty("status", "error");
        });
    });
});
