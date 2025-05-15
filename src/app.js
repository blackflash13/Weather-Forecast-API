const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");
require("dotenv").config();

const app = express();

const subscriptionRoutes = require("./routes/subscription");
const weatherRoutes = require("./routes/weather");
const pageRoutes = require("./routes/pages");

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Weather Forecast API",
            version: "1.0.0",
            description:
                "Weather API application that allows users to subscribe to weather updates for their city.",
        },
        host: "weatherapi.app",
        basePath: "/api",
        schemes: ["http", "https"],
    },
    apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", pageRoutes);
app.use("/api", subscriptionRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: "error",
        message: "Something went wrong!",
    });
});

module.exports = app;
