const nodemailer = require("nodemailer");

const HOST_URL = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.HOST_URL;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendConfirmationEmail = async (email, city, token) => {
    const confirmationUrl = `${HOST_URL}/api/confirm/${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Confirm your weather subscription",
        html: `
      <h1>Welcome to Weather Forecast API!</h1>
      <p>Please click the link below to confirm your subscription for weather updates for ${city}:</p>
      <a href="${confirmationUrl}">Confirm Subscription</a>
    `,
    };

    return transporter.sendMail(mailOptions);
};

const sendSubscriptionConfirmedEmail = async (email, token, city) => {
    const unsubscribeUrl = `${HOST_URL}/api/unsubscribe/${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Weather Forecast Subscription Confirmed!",
        html: `
      <h1>Welcome to Weather Forecast Updates!</h1>
      <p>You will be subscribed to receive weather updates for ${city}.</p>
      <p>If you want to unsubscribe, click the link below:</p>
      <a href="${unsubscribeUrl}">Unsubscribe</a>
    `,
    };

    return transporter.sendMail(mailOptions);
};

const sendUnsubscribeEmail = async (email, city) => {
    const resubscribeUrl = `${HOST_URL}/api/subscribe`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "We're sad to see you go!",
        html: `
      <h1>You've been unsubscribed from Weather Forecast Updates</h1>
      <p>We're so sad to see you go! Your weather updates for ${city} have been canceled.</p>
      <p>Changed your mind? You can resubscribe at any time:</p>
      <a href="${resubscribeUrl}">Resubscribe to Weather Updates</a>
    `,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendConfirmationEmail,
    sendSubscriptionConfirmedEmail,
    sendUnsubscribeEmail,
};
