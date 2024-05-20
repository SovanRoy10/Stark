import express from "express";

import {
 conversation
} from "../controllers/conversation.js";

const router = express.Router();

router.post("/conversation", conversation);

export default router;
