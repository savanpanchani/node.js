const nodemailer = require('nodemailer');

exports.sendEmail = async (msg) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER_ADMIN,
            pass: process.env.EMAIL_USER_PASSCODE,
        },
    });

    const info = await transporter.sendMail(msg);
    console.log("Message sent:", info.messageId);
    return info;
};
 