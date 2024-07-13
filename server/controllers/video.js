import Replicate from "replicate";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { catchAsyncErros } from "../middlewares/catchAsyncErros.js";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || "",
});

export const video = catchAsyncErros(async (req, res, next) => {
  const { messages } = req.body;

  if (!messages) return next(new ErrorHandler("Messages are required", 400));

  const output = await replicate.run(
    "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
    {
      input: {
        fps: 24,
        model: "xl",
        width: 1024,
        height: 576,
        prompt: messages,
        batch_size: 1,
        num_frames: 24,
        init_weight: 0.5,
        guidance_scale: 17.5,
        negative_prompt:
          "very blue, dust, noisy, washed out, ugly, distorted, broken",
        remove_watermark: false,
        num_inference_steps: 50,
      },
    }
  );
  // console.log(output);

  return res.status(200).json(output);
});
