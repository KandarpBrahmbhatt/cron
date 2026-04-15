import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/user.routes.js';
import dotenv from "dotenv"
import startUserCron from './cron/cronjob.js';
import newCron from './cron/crudcron.js';
dotenv.config()
const app = express();

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Start cron
// startUserCron();
newCron()
const port = 5000
app.listen(port, () => {
    console.log('Server running on port',port);
    connectDB()
});