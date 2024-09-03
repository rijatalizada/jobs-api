import { IUserData } from "../user";

declare global {
  namespace Express {
    export interface Request {
      user?: IUserData;
    }
  }
}
