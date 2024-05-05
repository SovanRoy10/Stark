import "dotenv/config";

import express from "express";

import userRouter from "./routes/user.js";

const app = express();
const PORT = process.env.PORT || 4000;

import cookieParser from "cookie-parser";

import { checkForAuthenticationCookie } from "./middlewares/authentication.js";

import mongoose from "mongoose";
mongoose.connect(process.env.MONGO_URL).then((e) => {
  console.log("MongoDB is connected...");
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(checkForAuthenticationCookie(process.env.COOKIE_NAME));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});
