const express = require("express");
const path = require("path");
const router = express.Router();

/**
 * Subscription confirmation page
 */
router.get("/confirm", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../../public/subscription-confirmed.html"),
    );
});

/**
 * Unsubscribe page
 */
router.get("/unsubscribe", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/unsubscribed.html"));
});

module.exports = router;
