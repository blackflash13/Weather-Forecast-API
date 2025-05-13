const request = require("supertest");
const app = require("../../src/app");
const subscriptionService = require("../../src/services/subscriptionService");

jest.mock("../../src/services/subscriptionService");

describe("Subscription API Endpoints", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("POST /api/subscribe", () => {
        it("should return 400 if required fields are missing", async () => {
            const response = await request(app)
                .post("/api/subscribe")
                .send({
                    email: "test@example.com",
                })
                .expect("Content-Type", /json/)
                .expect(400);

            expect(response.body).toHaveProperty("status", "error");
            expect(response.body).toHaveProperty("message");
        });

        it("should successfully subscribe with valid data", async () => {
            subscriptionService.createSubscription.mockResolvedValue({
                email: "test@example.com",
                city: "New York",
                frequency: "daily",
            });

            const response = await request(app)
                .post("/api/subscribe")
                .send({
                    email: "test@example.com",
                    city: "New York",
                    frequency: "daily",
                })
                .expect("Content-Type", /json/)
                .expect(200);

            expect(subscriptionService.createSubscription).toHaveBeenCalledWith(
                "test@example.com",
                "New York",
                "daily",
            );
            expect(response.body).toHaveProperty("message");
        });

        it("should return 409 if email is already subscribed", async () => {
            subscriptionService.createSubscription.mockRejectedValue({
                status: 409,
                message: "Email already subscribed",
            });

            const response = await request(app)
                .post("/api/subscribe")
                .send({
                    email: "existing@example.com",
                    city: "London",
                    frequency: "hourly",
                })
                .expect("Content-Type", /json/)
                .expect(409);

            expect(response.body).toHaveProperty("status", "error");
            expect(response.body).toHaveProperty("message");
        });
    });

    describe("GET /api/confirm/:token", () => {
        it("should confirm a subscription with a valid token", async () => {
            subscriptionService.confirmSubscription.mockResolvedValue({
                email: "test@example.com",
            });

            const response = await request(app)
                .get("/api/confirm/valid-token")
                .expect("Content-Type", /json/)
                .expect(200);

            expect(
                subscriptionService.confirmSubscription,
            ).toHaveBeenCalledWith("valid-token");
            expect(response.body).toHaveProperty("message");
        });

        it("should return 404 if token is not found", async () => {
            subscriptionService.confirmSubscription.mockRejectedValue({
                status: 404,
                message: "Token not found",
            });

            const response = await request(app)
                .get("/api/confirm/invalid-token")
                .expect("Content-Type", /json/)
                .expect(404);

            expect(response.body).toHaveProperty("status", "error");
            expect(response.body).toHaveProperty("message");
        });
    });

    describe("GET /api/unsubscribe/:token", () => {
        it("should unsubscribe with a valid token", async () => {
            subscriptionService.unsubscribe.mockResolvedValue({
                email: "test@example.com",
                deleted: true,
            });

            const response = await request(app)
                .get("/api/unsubscribe/valid-token")
                .expect("Content-Type", /json/)
                .expect(200);

            expect(subscriptionService.unsubscribe).toHaveBeenCalledWith(
                "valid-token",
            );
            expect(response.body).toHaveProperty("message");
        });

        it("should return 404 if token is not found", async () => {
            subscriptionService.unsubscribe.mockRejectedValue({
                status: 404,
                message: "Token not found",
            });

            const response = await request(app)
                .get("/api/unsubscribe/invalid-token")
                .expect("Content-Type", /json/)
                .expect(404);

            expect(response.body).toHaveProperty("status", "error");
            expect(response.body).toHaveProperty("message");
        });
    });
});
