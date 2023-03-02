import express from "express";
import "express-async-errors";
import connect from "./database/connect";
import authRouter from "./routes/auth";
import jobsAuth from "./routes/jobs";
import authorizationMiddleware from "./middlewares/authorization";
import notFoundMiddleware from "./middlewares/not-found";
import errorHandlerMiddleware from "./middlewares/error-handler";
import expressRateLimitter from 'express-rate-limit'
import helmet from "helmet";
import cors from 'cors'
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/auth", authRouter);
app.use("/api/jobs", authorizationMiddleware, jobsAuth);

app.set('trust proxy', 1)
app.use(
  expressRateLimitter({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);
app.use(helmet());
app.use(cors());


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT ?? 3000;

const start = () => {
  try {
    app.listen(port, () => {
      connect(process.env.MONGO_URI ?? "");
      console.log(`app is listening to the port ${port}`);
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

start();
