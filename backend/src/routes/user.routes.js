import express from "express";
import { body } from "express-validator";
import { login, register } from "../controllers/user.controller.js";

const router = express.Router();

router.post(
  "/register",
  [body("name").isLength(3), body("email").isEmail()],
  register
);

router.post("/login", [], login);

export default router;
