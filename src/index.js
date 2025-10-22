// require('dotenv').config({path: './env'});
import dotenv from "dotenv";

import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        app.on("error", (error) => {
            console.error("Failed to connect with database", error);
            throw error;
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed  !!! ", err);
        process.exit(1);
    });







    
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
