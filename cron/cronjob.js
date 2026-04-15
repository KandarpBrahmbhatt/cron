// cron/user.cron.js
import cron from "node-cron";
import User from "../models/user.model.js";
import { faker } from '@faker-js/faker';
const startUserCron = () => {
cron.schedule("*/5 * * * * *" , async () => {
  try {
    const user = new User({
      name: faker.person.fullName(),
     email: faker.internet.email(),
    });

    await user.save();
    console.log("User Created:", user.email);

  } catch (error) {
    console.error("Cron Error:", error.message);
  }
});

cron.schedule("*/4 * * * * *", async () => {
  try {
    const timeLimit = new Date(Date.now() - 60 * 1000); // 1 min old Delete all users who were created before 1 minute ago

    const result = await User.deleteMany({
      createdAt: { $lt: timeLimit }
    });

    console.log("Deleted users:", result.deletedCount);

  } catch (error) {
    console.log("Cron Delete Error:", error.message);
  }
});

cron.schedule("*/10 * * * * *", async () => {
  try {
    const timeLimit = new Date(Date.now() - 1 * 1000); // 30 sec old

    const result = await User.updateMany(
      { createdAt: { $lt: timeLimit } },
      { active: false }
    );

    console.log("Users updated:", result.modifiedCount);

  } catch (err) {
    console.log("Update Cron Error:", err.message);
  }
});

};

export default startUserCron;