import express from "express";

import { conversation } from "../controllers/conversation.js";
import { code } from "../controllers/code.js";
import { image } from "../controllers/image.js";

const router = express.Router();

router.post("/conversation", conversation);
router.post("/code", code);
router.post("/image", image);

export default router;
