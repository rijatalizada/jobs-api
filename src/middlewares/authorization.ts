import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { BadRequestError, UnauthenticatedError } from "../errors";
import * as dotenv from "dotenv";
dotenv.config();

const authorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHead = req.headers.authorization;

  if (!authorizationHead || !authorizationHead.startsWith("Bearer ")) {
    throw new UnauthenticatedError("please provide bearer token");
  }

  try {
    const token = authorizationHead.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET ?? "");
    const user = {
      userId: (<any>payload).userId,
      username: (<any>payload).username,
      email: (<any>payload).email,
    };
    req.user = user;
    next();
  } catch (error) {
    throw new UnauthenticatedError("not authorized to access this route");
  }
};

export default authorizationMiddleware;
