import Replicate from "replicate";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { catchAsyncErros } from "../middlewares/catchAsyncErros.js";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export const image = catchAsyncErros(async (req, res, next) => {
  const { messages, amount = "1", resolution = "512" } = req.body;
  if (!messages) return next(new ErrorHandler("Messages are required", 400));
  if (!amount) return next(new ErrorHandler("Amount is required", 400));
  if (!resolution) return next(new ErrorHandler("Resolution is required", 400));

  const output = await replicate.run(
    "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
    {
      input: {
        width: parseInt(resolution),
        height: parseInt(resolution),
        prompt: messages,
        scheduler: "K_EULER",
        num_outputs: parseInt(amount),
        guidance_scale: 7.5,
        num_inference_steps: 50,
        safety_checker: false,
        requires_safety_checker: false,
      },
    }
  );
  // console.log(output);

  return res.status(200).json(output);
});
