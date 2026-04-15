import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "brahmbhattkandarp64@gmail.com",
    pass: "ofwh fnef bpjx xqgz", // app password
  },
});

export const sendEmail = async (to) => {
  try {
    await transporter.sendMail({
      from: "brahmbhattkandarp64@gmail.com",
      to,
      subject: "Hello",
      text: "This email is sent every 5 seconds using cron!",
    });

    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Email failed for ${to}:`, error.message);
    throw error; // important for cron to detect failure
  }
};


// send error 
export const sendErrorEmail = async (error) => {
  try {
    await transporter.sendMail({
      from: "brahmbhattkandarp64@gmail.com",
      to: "brahmbhattkandarp64@gmail.com", // developer email
      subject: "Cron Job Failed",
      text: `Cron failed with error:\n\n${error.message}`,
    });

    console.log("Error email sent");
  } catch (err) {
    console.error("Failed to send error email:", err.message);
  }
};