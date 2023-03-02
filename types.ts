import { Schema } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
}

export interface IUserData {
  username: string;
  email: string;
  userId: string;
}

export interface IUserMethods {
  createJWT(): string;
  comparePassword(password: string): Promise<boolean>;
  decodeJWT(token: string): {
    userId: string;
    email: string;
    username: string;
  };
}

export interface IJob {
  company: string;
  position: string;
  status: status;
  createdBy: Schema.Types.ObjectId;
}

export interface CustomRequest extends Request {
  user: {
    userId: string;
    email: string;
    username: string;
  };
}

type status = "interview" | "declined" | "pending";
