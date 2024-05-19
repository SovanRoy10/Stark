import { User } from "../models/user.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { catchAsyncErros } from "../middlewares/catchAsyncErros.js";

// create
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
      new ErrorHandler("Password must contain at max 64 characters!", 400)
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

// read
export const getSingleUser = catchAsyncErros(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new ErrorHandler("User Not Found", 400));
  return res.status(200).json({
    success: true,
    user,
  });
});

// log in
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
        httpOnly: true,
        secure: true, // Ensure cookies are sent over HTTPS
        sameSite: "None", // Essential for cross-site/cross-origin requests
      })
      .json({
        success: true,
        message: "User logged in successfully!",
        user: jwtToken.user,
      });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// log out
export const handleLogOut = async (req, res) => {
  return res.status(200).clearCookie("starkToken").json({
    success: true,
    message: "Successfully Logged Out",
  });
};

// delete
export const removeUser = catchAsyncErros(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("User Not Found!", 404));
  }
  await user.deleteOne();
  res.status(200).json({
    success: true,
    message: "User Deleted!",
    user,
  });
});

// UPDATE
export const updateUser = catchAsyncErros(async (req, res, next) => {
  const id = req.params.id;

  const updatedUser = await User.findOneAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) return next(new ErrorHandler("Updation failed", 400));

  res.status(200).json({
    success: true,
    message: "User Updated",
    user: updateUser,
  });
});

// USE CREDITS
export const updateCredits = catchAsyncErros(async (req, res, next) => {
  const id = req.params.id;
  const updatedUserCredits = await User.findOneAndUpdate(
    { _id: id },
    { $inc: { creditBalance: 10 } },
    { new: true }
  );

  if (!updatedUserCredits)
    return next(new ErrorHandler("User credits update failed", 400));

  res.status(200).json({
    success: true,
    message: "User credits updated",
    credits: updateCredits,
  });
});
