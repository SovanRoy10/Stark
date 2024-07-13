import ErrorHandler from "../middlewares/errorMiddleware.js";
import { catchAsyncErros } from "../middlewares/catchAsyncErros.js";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const code = catchAsyncErros(async (req, res, next) => {
  let { messages } = req.body;

  if (!messages) return next(new ErrorHandler("Messages are required", 400));

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    tools: [
      {
        codeExecution: {},
      },
    ],
  });

  messages +=
    "You are a code generator.Your purpose is code generation. You must answer only in markdown code snippets. Use code comments for explanation.";

  const result = await model.generateContent(messages);
  const response = await result.response;
  const text = response.text();

  //   console.log(text)

  return res.status(200).json(text);
});
