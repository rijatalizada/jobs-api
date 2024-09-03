import { Schema } from "mongoose";

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
