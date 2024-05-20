import "dotenv/config";

import express from "express";

import userRouter from "./routes/user.js";
import openaiRouter from "./routes/openai.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;


import cookieParser from "cookie-parser";

import { checkForAuthenticationCookie } from "./middlewares/authentication.js";

import mongoose from "mongoose";
mongoose.connect(process.env.MONGO_URL).then((e) => {
  console.log("MongoDB is connected...");
});

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(checkForAuthenticationCookie(process.env.COOKIE_NAME));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user", userRouter);
app.use("/api/v1", openaiRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});
