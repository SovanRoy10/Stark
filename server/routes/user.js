import express from "express";

import {
  handlePostSignUp,
  handlePostLogin,
  handleLogOut,
} from "../controllers/user.js";

const router = express.Router();

router.post("/signup", handlePostSignUp);
router.post("/login", handlePostLogin);
router.get("/logout", handleLogOut);

export default router;
