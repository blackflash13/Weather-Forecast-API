const crypto = require("crypto");
const Subscription = require("../models/subscription");
const {
    sendConfirmationEmail,
    sendSubscriptionConfirmedEmail,
} = require("./emailService");

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
        { email, active: true },
        { _id: true },
    );

    if (existingSubscription) {
        const duplicateError = {
            status: 409,
            message: "Email already subscribed",
        };
        throw duplicateError;
    }

    const token = generateToken();
    const subscription = new Subscription({
        email,
        city,
        frequency,
        token,
        confirmed: false,
    });

    await subscription.save();
    await sendConfirmationEmail(email, token);

    return subscription;
};

/**
 * Confirm a subscription
 * @param {string} token - Confirmation token
 * @returns {Promise<Object>} - Updated subscription
 */
const confirmSubscription = async (token) => {
    const subscription = await Subscription.findOne(
        { token },
        { _id: true, token: true, email: true },
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
    await subscription.save();
    await sendSubscriptionConfirmedEmail(
        subscription.email,
        subscription.token,
    );

    return subscription;
};

/**
 * Unsubscribe user
 * @param {string} token - Unsubscribe token
 * @returns {Promise<Object>} - Updated subscription
 */
const unsubscribe = async (token) => {
    const subscription = await Subscription.findOne({ token }, { _id: true });

    if (!subscription) {
        const notFoundError = {
            status: 404,
            message: "Token not found",
        };
        throw notFoundError;
    }

    subscription.active = false;
    subscription.updated = Date.now();
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
