import cron from 'node-cron'
import User from '../models/user.model.js'
import { faker } from '@faker-js/faker'

const newCron = () => {

    cron.schedule("*/5 * * * * * ", async () => {
        console.log("Running cron every 5 second")

        try {
            const user = await new User({
                name: faker.person.fullName(),
                email: faker.internet.email()
            })

            await user.save()
            console.log("User created:", user.email)
        } catch (error) {
            console.log(error)
            console.error("Cron Error : ", error.message)
        }
    })

    cron.schedule("*/3 * * * * *", async () => {
        try {
            const timeLimit = new Date(Date.now() - 60 * 1000)

            const result = await User.deleteMany({
                createdAt: { $lt: timeLimit }
            })

            console.log("Deleted Users:", result.deletedCount)
        } catch (error) {
            console.log("Cron Deleted error:", error.message)
        }
    })

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
}

export default newCron