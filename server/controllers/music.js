import Replicate from "replicate";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { catchAsyncErros } from "../middlewares/catchAsyncErros.js";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export const music = catchAsyncErros(async (req, res, next) => {
  const { messages, amount = "1", resolution = "512" } = req.body;
  if (!messages) return next(new ErrorHandler("Messages are required", 400));
  if (!amount) return next(new ErrorHandler("Amount is required", 400));
  if (!resolution) return next(new ErrorHandler("Resolution is required", 400));

  const output = await replicate.run(
    "meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb",
    {
      input: {
        top_k: 250,
        top_p: 0,
        prompt:
          "Edo25 major g melodies that sound triumphant and cinematic. Leading up to a crescendo that resolves in a 9th harmonic",
        duration: 8,
        temperature: 1,
        continuation: false,
        model_version: "stereo-large",
        output_format: "mp3",
        continuation_start: 0,
        multi_band_diffusion: false,
        normalization_strategy: "peak",
        classifier_free_guidance: 3,
      },
    }
  );
  // console.log(output);

  return res.status(200).json(output);
});
