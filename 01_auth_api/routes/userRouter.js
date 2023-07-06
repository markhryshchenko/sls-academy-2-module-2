import { Router } from "express";
import controller from "../controllers/authController.js";
import authMiddleware from "../middlewaree/authMiddleware.js";
const router = new Router();


router.get("/me",authMiddleware, controller.getUser);

export default router;
