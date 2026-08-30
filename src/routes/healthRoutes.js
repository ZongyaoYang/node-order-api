import express from "express";

import { healthController } from "../controllers/healthController.js";

const router = express.Router();

router.get("/live", healthController.getLiveness);

router.get("/ready", healthController.getReadiness);

export default router;
