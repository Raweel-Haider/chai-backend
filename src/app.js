import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

//settings data came from where (form,url,json,file(is from multer which use third party package to handle file upload))
app.use(cookieParser());
app.use(express.json({limit: '16kb'})); // to parse json data 
app.use(express.urlencoded({ extended: true , limit: '16kb' })); // to parse urlencoded data
app.use(express.static("public")); // to serve static files from the 'public' directory
app.use(cookieParser());// to parse cookies from incoming requests




export {app}