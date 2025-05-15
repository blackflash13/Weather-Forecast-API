const Joi = require("joi");

const subscriptionSchema = Joi.object({
    email: Joi.string().email().required(),
    city: Joi.string().required(),
    frequency: Joi.string().valid("hourly", "daily").required(),
});

const weatherQuerySchema = Joi.object({
    city: Joi.string().required(),
});

const validateSubscription = (req, res, next) => {
    const { error } = subscriptionSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            status: "error",
            message: "Invalid input",
        });
    }

    next();
};

const validateWeatherQuery = (req, res, next) => {
    const { error } = weatherQuerySchema.validate(req.query);

    if (error) {
        return res.status(400).json({
            status: "error",
            message: "Invalid input",
        });
    }

    next();
};

module.exports = {
    validateSubscription,
    validateWeatherQuery,
};
