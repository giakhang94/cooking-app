import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide name"],
    unique: true,
    mixLength: 3,
    maxLenght: 50,
  },
  password: {
    minLenght: 6,
    type: String,
    required: [true, "please provide password"],
  },
});
UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  user.password = await bcrypt.hash(user.password, 8);
  next();
});
UserSchema.methods.createJWT = async function () {
  const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};
const User = mongoose.model("User", UserSchema);
export default User;
