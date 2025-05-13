const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    frequency: {
        type: String,
        required: true,
        enum: ["hourly", "daily"],
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    token: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
