import Cooking from "../models/cooking.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
const createMeal = async (req, res) => {
  const { meat, name, descripton, link } = req.body;
  if (!meat && !name && !descripton && !link) {
    throw new BadRequestError("hay nhap day du thong tin");
  }
  const newMeal = await Cooking.create(req.body);
  res.status(201).json({ newMeal });
};
const getMealByCategory = async (req, res) => {
  const cate = req.params.cate;
  if (!cate) {
    throw new BadRequestError("hay chon 1 loai nguyen lieu");
  }
  const cates = await Cooking.find({ meat: cate }); //đáng lẻ là getbymeat, mà lỡ rồi lười sửa
  if (cates.length === 0) {
    throw new NotFoundError("chưa có món từ nguyên liệu này");
  }
  res.status(200).json({ result: cates });
};

export { createMeal, getMealByCategory };
