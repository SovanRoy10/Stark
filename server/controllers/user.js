import {User} from "../models/user.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { catchAsyncErros } from "../middlewares/catchAsyncErros.js";

export const handlePostSignUp = catchAsyncErros(async (req, res) => {
  const { email, name, password } = req.body;
  if (!name || !email || !password)
    return next(new ErrorHandler("Please Fill Full Form!", 400));

  // Password length validation
  if (password.length < 6) {
    return next(
      new ErrorHandler("Password must contain at least 6 characters!", 400)
    );
  }

  if (password.length > 64) {
    return next(
      new ErrorHandler("Password must contain atmax 64 characters!", 400)
    );
  }

  let userExist = await User.findOne({ email }).exec();
  if (userExist) return next(new ErrorHandler("User already exist!", 400));

  const user = await User.create({
    name,
    email,
    password,
  });

  return res.status(200).json({
    success: true,
    message: "User Registered!",
  });
});

export const handlePostLogin = catchAsyncErros(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorHandler("Please Provide All Details!", 400));
  try {
    const jwtToken = await User.matchPasswordAndGenerateToken(email, password);
    return res
      .cookie(jwtToken.tokenName, jwtToken.token, {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
      })
      .json({
        success: true,
        message: "User logged in successfully!",
      });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

export const handleLogOut = async (req, res) => {
  return res.status(200).clearCookie("starkToken").json({
    success: true,
    message: "Successfully Logged Out",
  });
};
