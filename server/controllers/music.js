import Replicate from "replicate";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { catchAsyncErros } from "../middlewares/catchAsyncErros.js";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || "",
});

export const music = catchAsyncErros(async (req, res, next) => {
  const { messages } = req.body;

   if (!messages) return next(new ErrorHandler("Messages are required", 400));

  const output = await replicate.run(
    "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
    {
      input: {
        alpha: 0.5,
        prompt_a: messages,
        // prompt_b: "90's rap",
        denoising: 0.75,
        seed_image_id: "vibes",
        num_inference_steps: 50,
      },
    }
  );
  // console.log(output);

  return res.status(200).json(output);
});
