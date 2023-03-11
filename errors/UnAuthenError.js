import CustomError from "./CustomError.js";
class UnAuthenError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
export default UnAuthenError;
