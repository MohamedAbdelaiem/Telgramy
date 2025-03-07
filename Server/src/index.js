import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import xss from "xss-clean";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

import { app, server } from "../LIB/socket.js";

import path from "path";

//dataBase
import { connect } from "../LIB/db.js";

//Routes
import AuthRoute from "../Routes/authRoute.js";
import messageRoute from "../Routes/messgaeRoute.js";

//Middlewares
app.use(
  express.json({
    limit: "12mb",
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "https://tlgram-mohamedabdelaiems-projects.vercel.app",
      ];
      
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


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
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Client", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  connect();
  console.log("Server is running on port " + PORT);
});
