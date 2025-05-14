const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendConfirmationEmail = async (email, token) => {
    const confirmationUrl = `${process.env.HOST_URL}/api/confirm/${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Confirm your weather subscription",
        html: `
      <h1>Welcome to Weather Forecast API!</h1>
      <p>Please click the link below to confirm your subscription:</p>
      <a href="${confirmationUrl}">Confirm Subscription</a>
    `,
    };

    return transporter.sendMail(mailOptions);
};

const sendSubscriptionConfirmedEmail = async (email, token) => {
    const unsubscribeUrl = `${process.env.HOST_URL}/api/unsubscribe/${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Weather Forecast Subscription Confirmed!",
        html: `
      <h1>Welcome to Weather Forecast Updates!</h1>
      <p>You will be subscribed to receive weather updates.</p>
      <p>If you want to unsubscribe, click the link below:</p>
      <a href="${unsubscribeUrl}">Unsubscribe</a>
    `,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendConfirmationEmail,
    sendSubscriptionConfirmedEmail,
};
