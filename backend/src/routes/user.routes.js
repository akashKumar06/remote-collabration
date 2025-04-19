import express from "express";
import { body } from "express-validator";
import {
  loginUser,
  refreshTokenHandler,
  registerUser,
} from "../controllers/user.controller.js";
import { validateRequest } from "../middlewares/validate-request.middleware.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("firstname").notEmpty().withMessage("Firstname is required."),
    body("lastname").notEmpty().withMessage("Lastname is required."),
    body("email").isEmail().withMessage("Invalid email address."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
  ],
  validateRequest,
  registerUser
);

router.post(
  "/login",
  [body("email").isEmail().withMessage("Invalid email address.")],
  validateRequest,
  loginUser
);

router.post("/refresh_token", refreshTokenHandler);

export default router;
