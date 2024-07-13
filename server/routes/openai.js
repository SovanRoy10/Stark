import express from "express";

import { conversation } from "../controllers/conversation.js";
import { code } from "../controllers/code.js";
import { image } from "../controllers/image.js";
import { music } from "../controllers/music.js";

const router = express.Router();

router.post("/conversation", conversation);
router.post("/code", code);
router.post("/image", image);
router.post("/music", music);

export default router;
