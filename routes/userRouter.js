import express from "express";
import {
  getCurrentUser,
  login,
  logout,
  register,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/getCurrentUser", getCurrentUser);
router.get("/logout", logout);
export default router;
