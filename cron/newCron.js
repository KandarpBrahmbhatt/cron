import cron from "node-cron";
import User from "../models/user.model.js";
import { sendEmail, sendErrorEmail } from "../config/nodemailer.js";

const startEmailCron = () => {
  cron.schedule("*/5 * * * * *", async () => {
    console.log(" Running cron every 5 seconds...");

    try {
      // Get logged-in users
      const users = await User.find({ isLoggedIn: true });

      for (let user of users) {
        try {
          await sendEmail(user.email);
        } catch (err) {
          console.error(`Failed for ${user.email}`);
        }
      }

    } catch (error) {
      console.error(" Cron Error:", error.message);
      await sendErrorEmail(error);
    }
  });

  //  cron.schedule("*/5 * * * * *", async () => {
  //   try {
  //     console.log("Cron running...");

  //     await sendEmail("test@gmail.com");

  //   } catch (error) {
  //     console.error("Cron failed:", error.message);

  //     await sendErrorEmail(error); //  ALERT TO YOU

  //   }
  // });

};



export default startEmailCron;