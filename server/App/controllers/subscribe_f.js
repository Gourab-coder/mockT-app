const nodemailer = require('nodemailer');
require('dotenv').config();

// This function will handle sending the subscription email.
const handleSubscription = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required." });
    }

    // 1. Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS, 
        },
    });

    // 2. Define email options
    const mailOptions = {
        from: process.env.EMAIL_USER,       
        to: process.env.EMAIL_USER,         
        subject: 'New Subscription to mockT',
        text: `You have a new subscriber!\n\nEmail: ${email}`,
        html: `<p>You have a new subscriber!</p><p><b>Email:</b> ${email}</p>`,
    };

    // 3. Send the email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Thank you for subscribing!" });
    } catch (error) {
        console.error("Error sending subscription email:", error);
        res.status(500).json({ message: "Failed to subscribe. Please try again later." });
    }
};

module.exports = {
    handleSubscription,
};