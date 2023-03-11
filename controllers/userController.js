import User from "../models/user.js";
import jwt from "jsonwebtoken";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenError,
} from "../errors/index.js";
import bcrypt from "bcrypt";
const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("hay nhap day du thong tin");
  }
  console.log("tao");
  const newUser = await User.create({ username, password });
  res.status(201).json({ user: newUser });
};
const login = async (req, res) => {
  console.log("login");
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("hay nhap day du thong tin");
  }
  const user = await User.findOne({ username });
  if (!user) {
    throw new NotFoundError("khong tim thay user");
  }
  const isMatchPassword = await bcrypt.compare(password, user.password);
  if (!isMatchPassword) {
    throw new UnAuthenError("Password khong chinh xac");
  }
  console.log("login done");
  //tao cookie
  const token = await user.createJWT();
  //tao thoi gian ton tai cua cookie
  const oneDay = 1000 * 60 * 60 * 24;
  const oneDayCookie = new Date(Date.now() + oneDay);
  //add cookie len req
  res.cookie("token", token, {
    httpOnly: true,
    httpOnly: true, // only browser => very very important
    expires: oneDayCookie,
    secure: process.env.NODE_ENV === "production",
    //only send the cookie if the protocol is HTTPS => secure: process.env.NOE_ENV (khi len production => true)
  });
  user.password = undefined;
  res.status(201).json(user);
};
const getCurrentUser = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    throw new UnAuthenError("chua login");
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  const { userId } = decode;
  const user = await User.findOne({ _id: userId });
  user.password = undefined;
  res.status(200).json({ user });
};
const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 100),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(201).send("logout");
};
export { login, register, getCurrentUser, logout };
