import { Router } from "express";
import {  body } from "express-validator";
import controller from "../controllers/authController.js";
import authMiddleware from "../middlewaree/authMiddleware.js";
const router = new Router();

router.post(
  "/sign-up",
  body("email").isEmail().withMessage('"Enter valid email!"'),
  body("password")
    .isLength({
      min: 4,
    })
    .withMessage("The password must be at least 4 characters"),
  controller.signUp
);
router.post("/sign-in", controller.signIn);
router.get("/me",authMiddleware, controller.getUser);

export default router;
