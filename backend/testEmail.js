import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: "diya067btcse24@igdtuw.ac.in",
  subject: "Test Email",
  text: "This is a test email from nodemailer",
})
.then(() => console.log("Email sent ✅"))
.catch((err) => console.log("Email error ❌", err));
