const express = require("express");
const router = express.Router();
const { validateSubscription } = require("../middleware/validation");
const {
    subscribe,
    confirmSubscription,
    unsubscribe,
} = require("../controllers/subscriptionController");

/**
 * @swagger
 * /api/subscribe:
 *   post:
 *     tags:
 *       - subscription
 *     summary: Subscribe to weather updates
 *     description: Subscribe an email to receive weather updates for a specific city with chosen frequency.
 *     parameters:
 *       - name: email
 *         in: formData
 *         description: Email address to subscribe
 *         required: true
 *         type: string
 *       - name: city
 *         in: formData
 *         description: City for weather updates
 *         required: true
 *         type: string
 *       - name: frequency
 *         in: formData
 *         description: Frequency of updates (hourly or daily)
 *         required: true
 *         type: string
 *         enum: [hourly, daily]
 *     responses:
 *       200:
 *         description: Subscription successful. Confirmation email sent.
 *       400:
 *         description: Invalid input
 *       409:
 *         description: Email already subscribed
 */
router.post("/subscribe", validateSubscription, subscribe);

/**
 * @swagger
 * /api/confirm/{token}:
 *   get:
 *     tags:
 *       - subscription
 *     summary: Confirm email subscription
 *     description: Confirms a subscription using the token sent in the confirmation email.
 *     parameters:
 *       - name: token
 *         in: path
 *         description: Confirmation token
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Subscription confirmed successfully
 *       400:
 *         description: Invalid token
 *       404:
 *         description: Token not found
 */
router.get("/confirm/:token", confirmSubscription);

/**
 * @swagger
 * /api/unsubscribe/{token}:
 *   get:
 *     tags:
 *       - subscription
 *     summary: Unsubscribe from weather updates
 *     description: Unsubscribes an email from weather updates using the token sent in emails.
 *     parameters:
 *       - name: token
 *         in: path
 *         description: Unsubscribe token
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Unsubscribed successfully
 *       400:
 *         description: Invalid token
 *       404:
 *         description: Token not found
 */
router.get("/unsubscribe/:token", unsubscribe);

module.exports = router;
