const crypto = require("crypto");
const Subscription = require("../models/subscription");
const {
    sendConfirmationEmail,
    sendSubscriptionConfirmedEmail,
    sendUnsubscribeEmail,
} = require("./emailService");
const { getWeatherForCity } = require("./weatherService");
/**
 * Generate a random token
 * @returns {string} - Random hex token
 */
const generateToken = () => crypto.randomBytes(16).toString("hex");

/**
 * Create a new subscription
 * @param {string} email - Subscriber email address
 * @param {string} city - City to subscribe
 * @param {string} frequency - Update frequency (hourly/daily)
 * @returns {Promise<Object>} - Created subscription
 */
const createSubscription = async (email, city, frequency) => {
    const existingSubscription = await Subscription.findOne(
        { email, city, active: true },
        { _id: true },
    );

    if (existingSubscription) {
        const duplicateError = {
            status: 409,
            message: "Email already subscribed",
        };
        throw duplicateError;
    }

    await getWeatherForCity(city);

    const token = generateToken();
    const subscription = new Subscription({
        email,
        city,
        frequency,
        token,
        confirmed: false,
    });

    await sendConfirmationEmail(email, city, token);
    await subscription.save();

    return subscription;
};

/**
 * Confirm a subscription
 * @param {string} token - Confirmation token
 * @returns {Promise<Object>} - Updated subscription
 */
const confirmSubscription = async (token) => {
    const subscription = await Subscription.findOne(
        { token, confirmed: false, active: true },
        { _id: true, token: true, email: true, city: true },
    );

    if (!subscription) {
        const notFoundError = {
            status: 404,
            message: "Token not found",
        };
        throw notFoundError;
    }

    subscription.confirmed = true;
    subscription.updated = Date.now();

    await sendSubscriptionConfirmedEmail(
        subscription.email,
        subscription.token,
        subscription.city,
    );
    await subscription.save();

    return subscription;
};

/**
 * Unsubscribe user
 * @param {string} token - Unsubscribe token
 * @returns {Promise<Object>} - Updated subscription
 */
const unsubscribe = async (token) => {
    const subscription = await Subscription.findOne(
        { token, active: true },
        { _id: true, email: true, city: true },
    );

    if (!subscription) {
        const notFoundError = {
            status: 404,
            message: "Token not found",
        };
        throw notFoundError;
    }

    subscription.active = false;
    subscription.updated = Date.now();

    await sendUnsubscribeEmail(subscription.email, subscription.city);
    await subscription.save();

    return {
        email: subscription.email,
        deleted: true,
    };
};

module.exports = {
    createSubscription,
    confirmSubscription,
    unsubscribe,
};
