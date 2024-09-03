export interface IUser {
  username: string;
  email: string;
  password: string;
}

export interface IUserData {
  userId: string;
  username: string;
  email: string;
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
