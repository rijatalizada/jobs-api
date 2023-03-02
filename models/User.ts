import mongoose from "mongoose";
import bycryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { BadRequestError } from "../errors";
import { IUser, IUserMethods } from "../types";

dotenv.config();




const UserSchema = new mongoose.Schema<IUser, {}, IUserMethods>({
  username: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
    unique: true,
    uniqueCaseInsensitive: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
});

UserSchema.pre("save", async function () {
  const salt = await bycryptjs.genSalt(10);
  const encrypted = await bycryptjs.hash(this.password, salt);
  this.password = encrypted;
});

UserSchema.methods.createJWT = function () {
  if (process.env.JWT_SECRET) {
    return jwt.sign(
      { userId: this._id, username: this.username, email: this.email },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
  } else {
    return "";
  }
};

UserSchema.methods.comparePassword = async function (password: string) {
  const isMatch = await bycryptjs.compare(password, this.password);
  return isMatch;
};

UserSchema.methods.decodeJWT = function (token: string) {
  const payload = jwt.verify(token, process.env.JWT_SECRET!);

  return {
    userId: (<any>payload).userId as string,
    email: (<any>payload).email as string,
    username: (<any>payload).username as string,
  };
};

export default mongoose.model("User", UserSchema);
