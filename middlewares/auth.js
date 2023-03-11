import { UnAuthenError } from "../errors/index.js";
import jwt from "jsonwebtoken";
const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new UnAuthenError("Hãy đăng nhập để tiếp tục");
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decode.userId;
    req.user = { userId: userId };
    next();
  } catch (error) {
    throw new UnAuthenError("Hãy đăng nhập để tiếp tục");
  }
};
export default auth;
