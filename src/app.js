const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "2.0",
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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api", require("./routes/subscription"));
app.use("/api/weather", require("./routes/weather"));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: "error",
        message: "Something went wrong!",
    });
});

module.exports = app;
