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

// // import axios from 'axios';
// import ErrorHandler from "../middlewares/errorMiddleware.js";
// import { catchAsyncErros } from "../middlewares/catchAsyncErros.js";
// import axios from "axios"

// export const image = catchAsyncErros(async (req, res, next) => {
//   const { messages } = req.body;

//   if (!messages) return next(new ErrorHandler("Prompt is required", 400));
//   // if (!aspect_ratio) return next(new ErrorHandler('Aspect ratio is required', 400));

//   try {
//     const response = await axios.post(
//       "https://api.limewire.com/api/image/generation",
//       { prompt : messages, aspect_ratio: "1:1" },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "X-Api-Version": "v1",
//           Accept: "application/json",
//           Authorization: `Bearer lmwr_sk_ohaA6W9MxD_1uaO4DqNlUOyKWwiG50AC9nyUmHvLX6xca1tm`,
//         },
//       }
//     );

//     const data = response.data;
//     console.log(data);
//     return res.status(200).json(data);
//   } catch (error) {
//     return next(
//       new ErrorHandler(
//         error.response ? error.response.data : error.message,
//         error.response ? error.response.status : 500
//       )
//     );
//   }
// });

