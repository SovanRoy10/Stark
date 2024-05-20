import ErrorHandler from "../middlewares/errorMiddleware.js";
import { catchAsyncErros } from "../middlewares/catchAsyncErros.js";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const conversation = catchAsyncErros(async (req, res, next) => {
  const { messages } = req.body;

  if (!messages) return next(new ErrorHandler("Messages are required", 400));

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(messages);
  const response = await result.response;
  const text = response.text();

//   console.log(text)

  return res.status(200).json(text);
});
