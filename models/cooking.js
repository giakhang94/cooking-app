import mongoose from "mongoose";
const CookingShema = new mongoose.Schema({
  meat: {
    type: String,
    enum: [
      "cá lóc",
      "lòng tong",
      "cá bóng",
      "thăn",
      "cánh gà",
      "bọng gà",
      "đùi gà",
      "điêu hồng",
      "bầu",
      "bí đỏ",
      "mướp",
      "củ cải",
      "củ dền",
      "cải xanh",
    ],
    required: true,
  },
  name: {
    type: String,
    required: true,
    minLength: 5,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
});

const Cooking = mongoose.model("Cooking", CookingShema);
export default Cooking;
