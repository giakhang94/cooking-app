import "express-async-errors";
import connectDB from "./db/connectDB.js";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import errorHandlerMiddleware from "./middlewares/ErrorHandlerMiddleware.js";
import userRouter from "./routes/userRouter.js";
import cookingRouter from "./routes/cookingRouter.js";
import notFoundMiddleware from "./middlewares/notFoundHandlerMiddleware.js";
//for deploy
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
//
const app = express();
const port = process.env.PORT || 5000;
dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});
//for deploy
app.use(express.static(path.resolve(__dirname, "./client/build")));
//

app.use("/api/user", userRouter);
app.use("/api/cooking", cookingRouter);
//for deploy
app.get("*", function (request, response) {
  responses.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
//
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);
//start
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log("server is on port", port);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
