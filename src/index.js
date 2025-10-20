// require('dotenv').config({path: './env'});
import dotenv from "dotenv";


import connectDB from "./db/index.js";

dotenv.config({ path: "./.env" });

connectDB();









/* 1st Approach(using iffe, and youcan use function also)


import express from "express";

const app = express();
(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error", (error) => {
            console.error("Failed to connect with database", error);
            throw error;
        });
        app.listen(PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Database connection failed", err);
        throw err;
    }
})();

*/
