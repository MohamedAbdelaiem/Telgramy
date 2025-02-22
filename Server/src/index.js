import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import xss from "xss-clean";
import helmet from "helmet";
import rateLimit from "express-rate-limit";





//dataBase
import { connect } from "../LIB/db.js";

//Routes
import AuthRoute from "../Routes/authRoute.js";
import messageRoute from "../Routes/messgaeRoute.js";
const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());

//Security
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
// });
// app.use(limiter);
app.use(helmet());
app.use(xss());

//Routes
app.use("/api/auth", AuthRoute);
app.use("/api/message", messageRoute);

dotenv.config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connect();
  console.log("Server is running on port " + PORT);
});
