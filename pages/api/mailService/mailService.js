var nodemailer = require("nodemailer");

export async function sendMail(subject, toEmail, otpText) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
      pass: process.env.NEXT_PUBLIC_NODEMAILER_PW,
    },
  });

  var mailOptions = {
    from: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
    to: [toEmail, "lucy14thakur@gmail.com",],
    subject: subject,
    html: otpText,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    // console.log("Email Sent: ");
    return true;
  } catch (error) {
    // console.error(error);
    throw new Error(error);
  }
}