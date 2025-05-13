const crypto = require("crypto");
const Subscription = require("../models/subscription");
const {
    sendConfirmationEmail,
    sendToUnsubscribeEmail,
} = require("../services/emailService");

const generateToken = () => crypto.randomBytes(16).toString("hex");

const subscribe = async (req, res) => {
    try {
        const { email, city, frequency } = req.body;

        const existingSubscription = await Subscription.findOne(
            {
                email,
                active: true,
            },
            { _id: true },
        );
        if (existingSubscription) {
            return res.status(409).json({
                status: "error",
                message: "Email already subscribed",
            });
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

        res.status(200).json({
            status: "success",
            message:
                "Subscription successful. Please check your email to confirm.",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "Error creating subscription",
        });
    }
};

const confirmSubscription = async (req, res) => {
    try {
        const { token } = req.params;
        const subscription = await Subscription.findOne(
            { token },
            { _id: true, token: true, email: true },
        );

        if (!subscription) {
            return res.status(404).json({
                status: "error",
                message: "Token not found",
            });
        }

        subscription.confirmed = true;
        subscription.updated = Date.now();
        await subscription.save();
        await sendToUnsubscribeEmail(subscription.email, subscription.token);

        res.status(200).json({
            status: "success",
            message: "Subscription confirmed successfully",
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            status: "error",
            message: "Error confirming subscription",
        });
    }
};

const unsubscribe = async (req, res) => {
    try {
        const { token } = req.params;
        const subscription = await Subscription.findOne(
            { token },
            { _id: true },
        );

        if (!subscription) {
            return res.status(404).json({
                status: "error",
                message: "Token not found",
            });
        }

        subscription.active = false;
        subscription.updated = Date.now();
        await subscription.save();

        res.status(200).json({
            status: "success",
            message: "Unsubscribed successfully",
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            status: "error",
            message: "Error unsubscribing",
        });
    }
};

module.exports = {
    subscribe,
    confirmSubscription,
    unsubscribe,
};
