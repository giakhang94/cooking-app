import fs from "fs";
const errorHandlerMiddleware = (error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  const defaultError = {
    statusCode: error.statusCode || 500,
    msg: error.message || "something went wrong, from handler",
  };
  console.log(error.name);
  if (error.name === "ValidationError") {
    defaultError.statusCode = 400;
    defaultError.msg = Object.values(error.errors)
      .map((err) => {
        return err.message;
      })
      .join(",");
  }
  if (error && error.code === 11000) {
    res.status(400).json({
      msg: `${error.keyValue.userName} has been used`,
    });
  }
  res.status(defaultError.statusCode).json({ error, msg: defaultError.msg });
};

export default errorHandlerMiddleware;
