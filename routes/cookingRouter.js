import express from "express";
import auth from "../middlewares/auth.js";
import {
  createMeal,
  getMealByCategory,
} from "../controllers/cookingController.js";
const router = express.Router();

router.post("/create", auth, createMeal);
router.get("/getbycates/:cate", getMealByCategory);

export default router;
