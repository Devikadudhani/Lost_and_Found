import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

const sendOtp = async (email, otp) => {
  const mailOptions = {
    from: `"IGDTUW Lost & Found" <${process.env.EMAIL}>`,
    to: email,
    subject: "Your OTP for verification",
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`
  };

  await transporter.sendMail(mailOptions);
};

export default sendOtp;
