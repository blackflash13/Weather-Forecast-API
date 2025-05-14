const {
    createSubscription: createSubscriptionService,
    confirmSubscription: confirmSubscriptionService,
    unsubscribe: unsubscribeService,
} = require("../services/subscriptionService");

const subscribe = async (req, res) => {
    try {
        const { email, city, frequency } = req.body;

        await createSubscriptionService(email, city, frequency);

        res.status(200).json({
            status: "success",
            message:
                "Subscription successful. Please check your email to confirm.",
        });
    } catch (error) {
        console.log(error);

        if (error.status === 404) {
            return res.status(404).json({
                status: "error",
                message: "City not found",
            });
        }

        if (error.status === 409) {
            return res.status(409).json({
                status: "error",
                message: "Email already subscribed",
            });
        }

        res.status(500).json({
            status: "error",
            message: "Error creating subscription",
        });
    }
};

const confirmSubscription = async (req, res) => {
    try {
        const { token } = req.params;

        await confirmSubscriptionService(token);

        res.status(200).json({
            status: "success",
            message: "Subscription confirmed successfully",
        });
    } catch (error) {
        console.log(error);

        if (error.status === 404) {
            return res.status(404).json({
                status: "error",
                message: "Token not found",
            });
        }

        res.status(500).json({
            status: "error",
            message: "Error confirming subscription",
        });
    }
};

const unsubscribe = async (req, res) => {
    try {
        const { token } = req.params;

        await unsubscribeService(token);

        res.status(200).json({
            status: "success",
            message: "Unsubscribed successfully",
        });
    } catch (error) {
        console.log(error);

        if (error.status === 404) {
            return res.status(404).json({
                status: "error",
                message: "Token not found",
            });
        }

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
