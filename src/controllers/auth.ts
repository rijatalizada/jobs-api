import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  CustomAPIError,
  UnauthenticatedError,
} from "../errors";
import User from "../models/User";

const register = async (req: Request, res: Response) => {
  const user = await User.create({ ...req.body });
  const jwt = user.createJWT();

  if (!jwt) {
    throw new CustomAPIError(
      "Failed to create user, please try again later",
      500
    );
  }

  return res.status(StatusCodes.CREATED).json({ jwt });
};

const login = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if ((!username ?? !email) || !password) {
    throw new BadRequestError("please provide email or name, and password");
  }

  let user = await User.findOne({ email: email });
  if (!user) {
    user = await User.findOne({ username: username });
    if (!user) {
      throw new UnauthenticatedError("Invalid Credentials");
    }
  }

  if (!(await user.comparePassword(password))) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  if (token) {
    const decoded = user.decodeJWT(token);
    return res.status(StatusCodes.OK).json({
      user: decoded,
      token,
    });
  } else {
    throw new CustomAPIError("There is a problem, please try again later", 500);
  }
};

export { login, register };
